import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { SharedService } from './shared-service';

@Injectable()
export class SocketService {
  constructor(public sharedService: SharedService) {}

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
      this.sharedService.subject.next(x);
    });
  }

  public sendIsVisible(message: any) {
    io.io('http://localhost:3000', { transports: ['websocket'] }).emit(
      'isVisible',
      message
    );

    this.receiveIsVisible();
  }

  public receiveIsVisible() {
    console.log('hello');
    let test = io.io('http://localhost:3000', { transports: ['websocket'] });

    test.on('onVisible', (x) => {
      console.log(x);
      this.sharedService.scoresVisible.next(x);
    });
  }
}
