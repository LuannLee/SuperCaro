import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register-model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide = true;

  public resgisterModel! : RegisterModel;

  constructor() {
    this.resgisterModel = new RegisterModel();
  }

  ngOnInit() {
  }

}
