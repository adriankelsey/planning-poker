import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { User } from '../login-component/models/user.model';
import { PlayerState } from '../main-component/models/player-state.model';
import { StateService } from './shared.service';

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

  public sendPlayerScore(playerState: PlayerState) {
    let socket = this.connection;
    socket?.emit('playerScore', playerState);
  }

  public async onPlayerScore() {
    let socket = this.connection;
    socket?.on('onPlayerScore', async (state) => {
      const users = await axios.get('http://localhost:3000/users');
      for (let i = 0; i < users.data.length; i++) {
        for (let x = 0; x < state.length; x++) {
          if (state[x].id === users.data[i].id) {
            users.data[i].playerScore = state[x].playerScore;
          }
        }
      }
      this.stateService.userData.next(users.data);

      axios.post('http://localhost:3000/users/playerScores', users.data);
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
      const playerScores = await axios.get(
        'http://localhost:3000/users/playerScores'
      );
      for (let i = 0; i < users.data.length; i++) {
        for (let x = 0; x < playerScores.data.length; x++) {
          if (playerScores.data[x].id === users.data[i].id) {
            users.data[i].playerScore = playerScores.data[x].playerScore;
          }
        }
      }
      this.stateService.userData.next(users.data);
      this.onNewUser();
      this.onPlayerScore();
      this.onIsVisible();
    });
  }

  public onNewUser() {
    let socket = this.connection;
    socket?.on('onNewUser', async (newUser) => {
      for (let i = 0; i < newUser.users.length; i++) {
        for (let x = 0; x < newUser.scores.length; x++) {
          if (newUser.users[i].id === newUser.scores[x].id) {
            newUser.users[i].playerScore = newUser.scores[x].playerScore;
          }
        }
      }

      this.stateService.userData.next(newUser.users);
    });
  }

  public sendIsVisible(visible: any, votingPhase: string) {
    let socket = this.connection;
    socket?.emit('isVisible', { visible: visible, votingPhase: votingPhase });
    this.onIsVisible();
  }

  public onIsVisible() {
    let socket = this.connection;
    socket?.on('onVisible', (visible) => {
      this.stateService.scoresVisible.next(visible);
    });
  }
}
