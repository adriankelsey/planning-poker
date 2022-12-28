import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { User } from '../login/models/user.model';
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

  public sendPlayerScore(playerState: any) {
    let socket = this.connection;
    socket?.emit('playerScore', playerState);
  }

  public onPlayerScore() {
    let socket = this.connection;
    socket?.on('onPlayerScore', async (score) => {
      const users = await axios.get('http://localhost:3000/users');
      console.log('on player score method');
      for (let i = 0; i < users.data.length; i++) {
        for (let x = 0; x < score.length; x++) {
          if (score[x].id === users.data[i].id) {
            users.data[i].playerScore = score[x].playerScore;
          }
        }
      }
      console.log(users);
      this.stateService.createPlayer.next(users.data);
    });
  }

  public createUser(user: User) {
    let socket = this.connection;
    user.connectionId = socket?.id;
    socket?.emit('newUser', user);
  }

  public onConnection() {
    let socket = this.connection;
    socket?.on('connect', async () => {
      const users = await axios.get('http://localhost:3000/users');
      // const playerState = await axios.get(
      //   'http://localhost:3000/users/playerScore'
      // );
      this.stateService.createPlayer.next(users.data);
      this.getUsers();
      this.onPlayerScore();
    });
  }

  public getUsers() {
    let socket = this.connection;
    socket?.on('onNewUser', (newUser) => {
      console.log('new user');
      console.log(newUser);
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
