import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public name : string = '';
  public decodedToken: any;

  constructor(private _jwtHelperService: JwtHelperService) {

    const token = localStorage.getItem('access_token')?.toString();

    this.decodedToken = this._jwtHelperService.decodeToken(token); // decode từ chuỗi token trong localStorage => json
  }

  ngOnInit() {
  }

}
