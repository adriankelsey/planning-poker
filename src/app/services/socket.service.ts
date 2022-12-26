import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { StateService } from './shared-service';

@Injectable()
export class SocketService {
  constructor(public stateService: StateService) {}

  public connect() {
    io.io('http://localhost:3000', { transports: ['websocket'] }).connect();
  }

  public sendPlayerScore(message: any) {
    message.playerName = localStorage.getItem('playerName');
    message.id = localStorage.getItem('playerId');
    console.log(message);
    io.io('http://localhost:3000', { transports: ['websocket'] }).emit(
      'playerScore',
      message
    );
  }

  public onPlayerScore() {
    let test = io.io('http://localhost:3000', { transports: ['websocket'] });
    test.on('onPlayerScore', (x) => {
      this.stateService.playerScore.next(x);
    });
  }

  public createUser(user: any) {
    io.io('http://localhost:3000', { transports: ['websocket'] }).emit(
      'newUser',
      user
    );
  }

  public getUsers() {
    let test = io.io('http://localhost:3000', { transports: ['websocket'] });
    test.on('onNewUser', (x) => {
      this.stateService.createPlayer.next(x);
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
    let test = io.io('http://localhost:3000', { transports: ['websocket'] });
    test.on('onVisible', (x) => {
      this.stateService.scoresVisible.next(x);
    });
  }
}
