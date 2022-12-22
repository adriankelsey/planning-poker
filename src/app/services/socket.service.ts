import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  constructor() {}

  public connect() {
    io.io('http://localhost:3000', { transports: ['websocket'] }).connect();
  }

  public sendMessage(message: any) {
    io.io('http://localhost:3000', { transports: ['websocket'] }).emit(
      'newMessage',
      message
    );
  }

  public receiveMessage() {
    let test = io.io('http://localhost:3000', { transports: ['websocket'] });

    test.on('onMessage', (x) => {
      console.log(x);
    });
  }
}
