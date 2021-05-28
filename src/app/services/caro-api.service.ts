
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class CaroApiService {

  constructor(private http : HttpClient) { }

  public postRegisterUser(registerModel: RegisterModel){
    return this.http.post("https://localhost:44362/api/User/register", registerModel);
  }

}
