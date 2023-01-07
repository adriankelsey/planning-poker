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

  public async onPlayerScore() {
    const scores = await axios.get('http://localhost:3000/users/playerScores');
    let socket = this.connection;
    socket?.on('onPlayerScore', async (score) => {
      const users = await axios.get('http://localhost:3000/users');
      for (let i = 0; i < users.data.length; i++) {
        for (let x = 0; x < score.length; x++) {
          if (score[x].id === users.data[i].id) {
            users.data[i].playerScore = score[x].playerScore;
          }
        }
      }
      this.stateService.createPlayer.next(users.data);
      await axios.post('http://localhost:3000/users/playerScores', users.data);
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
      this.stateService.createPlayer.next(users.data);
      this.onNewUser();
      this.onPlayerScore();
    });
  }

  // when logging into a new user it does not show the previous scores
  // we want to display the previous scores when logging in
  public onNewUser() {
    console.log('adding new user');
    let socket = this.connection;
    socket?.on('onNewUser', async (newUser) => {
      console.log(newUser);
      for (let i = 0; i < newUser.users.length; i++) {
        for (let x = 0; x < newUser.scores.length; x++) {
          if (newUser.users[i].id === newUser.scores[x].id) {
            newUser.users[i].playerScore = newUser.scores[x].playerScore;
          }
        }
      }

      this.stateService.createPlayer.next(newUser.users);
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
