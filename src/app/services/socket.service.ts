import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { StateService } from './shared-service';

@Injectable()
export class SocketService {
  connection: io.Socket | undefined;
  constructor(public stateService: StateService) {}

  public connect() {
    let connection = io
      .io('http://localhost:3000', { transports: ['websocket'] })
      .connect();
    this.connection = connection;
  }

  public sendPlayerScore(score: any) {
    let socket = this.connection;
    socket?.emit('playerScore', score);
  }

  public onPlayerScore() {
    let socket = this.connection;
    socket?.on('onPlayerScore', (score) => {
      this.stateService.playerScore.next(score);
    });
  }

  public createUser(user: any) {
    let socket = this.connection;
    socket?.emit('newUser', user);
  }

  public getUsers() {
    let socket = this.connection;
    socket?.on('onNewUser', (newUser) => {
      this.stateService.createPlayer.next(newUser);
    });
  }

  public sendIsVisible(visible: any) {
    let socket = this.connection;
    socket?.emit('isVisible', visible);
  }

  public receiveIsVisible() {
    let socket = this.connection;
    socket?.on('onVisible', (visible) => {
      this.stateService.scoresVisible.next(visible);
    });
  }
}
