import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-dual',
  templateUrl: './match-dual.component.html',
  styleUrls: ['./match-dual.component.scss']
})
export class MatchDualComponent implements OnInit {


  public user = {
    icon : "",
    name : "Luan"
  }
  public messages : any[] = [];
  public tempMessage = "";

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(event : any){
    let newMessage  = {
      icon: "",
      name : "LuanLee",
      content: event.target.value,
      owner : this.user.name
    }

    this.messages.push(newMessage);

    this.tempMessage = "";
  }




}
