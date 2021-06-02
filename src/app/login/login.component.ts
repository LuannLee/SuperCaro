import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { CaroApiService } from '../services/caro-api.service';
import { CaroRealTimeService } from '../services/caro-real-time.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true;

  public loginUser : LoginModel = new LoginModel();

  constructor(
    private _caroService: CaroApiService,
    private _snackBar: MatSnackBar,
    private _route : Router,
    private _caroRealTime : CaroRealTimeService
  ) {

    // Kết nối cổng thời gian thực
    this._caroRealTime.startConnection();

    // Lắng nghe sự thay đổi của User
    this._caroRealTime.addTransferUserOnlineListener();



    let loadingRegister = <boolean><unknown>localStorage.getItem('loading_register'); // kiểm tra xem tài khoản có phải vừa đc khởi tạo hay k?
    // phục vụ cho việc lưu UserName và Password vào localStorage
    if(false === loadingRegister) // nếu loadingRegister thì k lưu UserName và password
      return;

    let username = localStorage.getItem('user_name_register');
    let password = localStorage.getItem('password_register');

    if(null != username){
      this.loginUser.username = username?? this.loginUser.username;
      this.loginUser.password = password?? this.loginUser.password;
    }
  }

  ngOnInit() {
  }

  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

  public loginClick(){
    this._caroService.postLoginUser(this.loginUser).subscribe((response : any) => {
      localStorage.setItem('access_token', response);
      this.openSnackBar('Đăng nhập thành công !!');
      this.gotoNav('main-layout');
    },(error) =>{

      this.openSnackBar('Đăng nhập thất bại. Vui lòng kiểm tra lại !!')
    })
  }




}
