import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CaroApiService } from 'src/app/services/caro-api.service';

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

  constructor(
    private _caroApiService : CaroApiService,
    private _route : Router,
    private _snackBar: MatSnackBar,
  ) {

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

  public leaveRoom() {
    let userId = localStorage.getItem('userId');
    let roomId = localStorage.getItem('roomId');

    if(null == userId || null == roomId)
    {
      this.openSnackBar("Lỗi !")
      return;
    }


    this._caroApiService.leaveRoom(userId,roomId).subscribe((response : any) => {
      this.openSnackBar("Rời phòng thành công !");
      this.gotoNav("main-layout/chat-room");

    },(error) => {

      this.openSnackBar("Lỗi !");

    })

  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }
}
