import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaroRealTimeService {

  private hubConnection: HubConnection | undefined;

  public users : any;

  public startConnection(){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(`${environment.caroDomain}/real-time`)
    .build();

    this.hubConnection
    .start()
    .then(() => console.log("Kết nối SignalR thành công!"))
    .catch(err => console.log("Kết nối thất bại!" + err));
  }

  public addTransferUserOnlineListener(){
    this.hubConnection?.on('user-online', (users : any) => {
      this.users = users;
      console.log(users)
    });
  }

constructor() { }

}
