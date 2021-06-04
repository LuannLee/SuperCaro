import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { CaroApiService } from 'src/app/services/caro-api.service';
import { CaroRealTimeService } from 'src/app/services/caro-real-time.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  public users : User[] = [];

  public observerMessageSubcription : Subscription | undefined;

  constructor(
    private _caroService: CaroApiService,
    private _snackBar: MatSnackBar,
    private _caroRealTime : CaroRealTimeService
  ) {
    this.gerUser();

    // kết nối cổng thời gian thực
    this._caroRealTime.startConnection();

    // lắng nghe sự kiện thay đổi của User
    this._caroRealTime.addTransferUserOnlineListener();
  }

  ngOnDestroy(): void{
    this.observerMessageSubcription?.unsubscribe();
  }

  ngOnInit() {
    this.onMessageListener();
  }

  public onMessageListener(){
    this.observerMessageSubcription = this._caroRealTime.messageSouse.asObservable().subscribe((data : any) => {
      this.users = data;
    });
  }

  public gerUser(){
    this._caroService.getUser().subscribe((users : any) => {

      this.users = users;
    },(error) => {
      this.openSnackBar(error);
    });
  }

  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }

}
