import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-dual',
  templateUrl: './match-dual.component.html',
  styleUrls: ['./match-dual.component.scss']
})
export class MatchDualComponent implements OnInit {

  // đóng vai trò là tài khoản hiện tại mà trình duyệt đang đăng nhập
  public user = {
    icon : "assets/icon/Creative-Tail-Animal-bear.svg",
    name : ""
  }
  public messages : any[] = [];
  public tempMessage = "";



  public isLogin() : boolean{

    // Xử lý gì đó.....

    return true;
  }
// Ma trận tham chiếu bàn cờ
  public boardChess : any[] = [];

  constructor() {

    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 30; j++) {
        this.boardChess.push(
          {
            x : i,
            y : j,
            mark: false,
            player: null
          }

        )

      }
    }

   }

  ngOnInit() {
  }

  public sendMessage(event : any){
    let newMessage  = {
      icon: this.user.icon,
      name : "",
      content: event.target.value,
      owner : this.user.name
    }

    this.messages.push(newMessage);

    this.tempMessage = "";
  }

}
