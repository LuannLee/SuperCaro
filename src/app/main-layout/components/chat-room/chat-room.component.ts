import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { CaroApiService } from 'src/app/services/caro-api.service';
import { CaroRealTimeService } from 'src/app/services/caro-real-time.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  public users : User[] = [];

  public rooms : Room[] = [];

  public observerMessageSubcription : Subscription | undefined;

  public decodedToken: any;

  constructor(
    private _caroService: CaroApiService,
    private _snackBar: MatSnackBar,
    private _caroRealTime : CaroRealTimeService,
    private _matdialog : MatDialog,
    private _jwtHelperService: JwtHelperService,
    private _route : Router,

  ) {
    this.gerUser();
    this.getRoom();

    // kết nối cổng thời gian thực
    this._caroRealTime.startConnection();

    // lắng nghe sự kiện thay đổi của User
    this._caroRealTime.addTransferUserOnlineListener();

    const token = localStorage.getItem('access_token')?.toString();

    this.decodedToken = this._jwtHelperService.decodeToken(token); // decode từ chuỗi token trong localStorage => json => lấy user id
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

      // lọc người chơi đang online
      this.users = this.users?.filter(x => x.status === true);
    });
  }

  public gerUser(){
    this._caroService.getUser().subscribe((users : any) => {

      this.users = <User[]>users;

      //Lấy người chơi vs trạng thái bằng 1
      this.users = this.users?.filter(x => x.status === true);

    },(error) => {
      this.openSnackBar(error);
    });
  }

  public getRoom(){
    this._caroService.getRoom().subscribe((rooms : any) =>{
      this.rooms = <Room[]>rooms;
    },(error) =>{
      this.openSnackBar(error)
    });
  }

  public openSnackBar(message:string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000
    });
  }


  public openconfirmDialog(room :Room){
    const dialogRef = this._matdialog.open(ConfirmComponent).afterClosed().subscribe((isAgree : boolean) => {
      if(!isAgree)
        return;

      // Đã đồng ý
      this._caroService.joinRoom(this.decodedToken.id, room.id).subscribe((result : any) => {

        // lưu userId và roomId vào localStorage
        localStorage.setItem('userId', this.decodedToken.id);
        localStorage.setItem('roomId', room.id);

        this.gotoNav('main-layout/match-dual');
      },(error) => {
        this.openSnackBar(error);
      })

    });
  }

  public gotoNav = (url: string) => this._route.navigate([`/${url}`]);
}
