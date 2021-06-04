import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/login-model';
import { CaroApiService } from '../services/caro-api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public name : string = '';
  public decodedToken: any;

  constructor(private _jwtHelperService: JwtHelperService,
              private _route : Router,
              private _caroApiService: CaroApiService,
              private _snackBar: MatSnackBar)
              {

    const token = localStorage.getItem('access_token')?.toString();

    this.decodedToken = this._jwtHelperService.decodeToken(token); // decode từ chuỗi token trong localStorage => json
  }

  ngOnInit() {
  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

  public logOut(){
    // localStorage.clear(); Xoá toàn bộ cặp key-value

    localStorage.removeItem('access_token');

    let loginModel : LoginModel = new LoginModel();
    loginModel.username = this.decodedToken.useName;
    loginModel.password = this.decodedToken.password;

    this._caroApiService.logout(loginModel).subscribe((result : any) => {
      this.openSnackBar("Đăng xuất thành công");
    },(error) =>{
      this.openSnackBar("Đăng xuất thất bại");
    });

    this.gotoNav('login');
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
}
