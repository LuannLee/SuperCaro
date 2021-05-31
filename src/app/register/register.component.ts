import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register-model';
import { CaroApiService } from '../services/caro-api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hidePassword = true;
  public hideConfirmPassword = true;

  public resgisterModel! : RegisterModel;


  constructor(private _caroService: CaroApiService,
              private _snackBar: MatSnackBar,
              private _route : Router) {
    this.resgisterModel = new RegisterModel();
  }

  ngOnInit() {
  }

  public async registerUserClick(){
    let registerResponse : any = await this.registerUser();

    // Hiển thị messager
    this.openSnackBar(registerResponse.message);

    // Check trạng thái code
    if(400 === registerResponse.statusCode){
      return;
    }

    // nếu k lỗi thì lưu username và password vào localStorage

    localStorage.setItem('user_name_register', this.resgisterModel.userName);
    localStorage.setItem('password_register', this.resgisterModel.password);

    this.gotoNav('login');
  }

  public registerUser(){
   return new Promise<any>((resolve , rejects) => {
    this._caroService.postRegisterUser(this.resgisterModel).subscribe((response : any) =>{
      // khi đăng ký thành công
      resolve({
        statusCode: 200,
        message: response
      });
    },(error) =>{

      resolve({
        statusCode : 400,
        message : error
      });

    })
   });
  }


  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

}
