import { Component, OnInit } from '@angular/core';
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


  constructor(public caroService: CaroApiService) {
    this.resgisterModel = new RegisterModel();
  }

  ngOnInit() {
  }

  public registerApi(){
    this.caroService.postRegisterUser(this.resgisterModel).subscribe((result : any) =>{

    },(error) =>{

    })
  }

}
