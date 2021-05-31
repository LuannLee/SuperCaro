import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { CaroApiService } from '../services/caro-api.service';

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
    private _route : Router
  ) {

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
