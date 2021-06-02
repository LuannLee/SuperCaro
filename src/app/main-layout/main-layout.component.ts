import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public name : string = '';
  public decodedToken: any;

  constructor(private _jwtHelperService: JwtHelperService,
              private _route : Router) {

    const token = localStorage.getItem('access_token')?.toString();

    this.decodedToken = this._jwtHelperService.decodeToken(token); // decode từ chuỗi token trong localStorage => json
  }

  ngOnInit() {
  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

  public logOut(){
    // localStorage.clear(); Xoá toàn bộ cặp key-value

    localStorage.removeItem('access_token');
    this.gotoNav('login');
  }

}
