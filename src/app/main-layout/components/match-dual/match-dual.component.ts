import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CaroApiService } from 'src/app/services/caro-api.service';
import { CaroRealTimeService } from 'src/app/services/caro-real-time.service';

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

  public observerMessageSubcription : Subscription | undefined;

  constructor(
    private _caroApiService : CaroApiService,
    private _route : Router,
    private _snackBar: MatSnackBar,
    private _caroRealTime : CaroRealTimeService
  ) {

    // kết nối thời gian thực
    this._caroRealTime.startConnection();

    // Lắng nghe sự thay đổi của chat
    this._caroRealTime.addTransferChatOnlineListener();

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
    this.onMessageListener();
  }

  // func rời phòng

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

  // chuyển đường dẫn
  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);

  // mở snack Bar
  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }

  // Call Api chat
  public sendMessage(event : any){

    let currentUserId = localStorage.getItem('userId');
    let currentRoomId = localStorage.getItem('roomId');

    this._caroApiService.sendMessage(currentUserId, currentRoomId, event.target.value).subscribe((response : any) => {
      this.tempMessage = "";
    },(error) => {

    })
  }

  // Lắng nghe message trong SignalR
  public onMessageListener() {
    this.observerMessageSubcription = this._caroRealTime.chatSource.asObservable().subscribe((data : any) => {

      let currentUserId = localStorage.getItem('userId');
      let currentRoomId = localStorage.getItem('roomId');

      if(data?.userId == currentUserId && data?.roomId == currentRoomId){
        let newMessage = {
          icon: this.user.icon,
          name: "",
          content: data.message,
          owner: this.user.name,
        }

        this.messages.push(newMessage);
      }

      if(data?.userId != currentUserId && data?.roomId == currentRoomId)
      {
        let newMessage = {
          icon: this.user.icon,
          name: "",
          content: data.message,
          owner: "Not Current User",
        }

        this.messages.push(newMessage);
      }
    });
  }
}
