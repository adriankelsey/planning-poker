import { Injectable } from '@angular/core';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { StateService } from 'src/app/services/shared-service';
import { SocketService } from 'src/app/services/socket.service';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    public stateService: StateService,
    public socketService: SocketService
  ) {}

  public async createUser(name: string, id: string) {
    const user: User = {
      id: id,
      playerName: name,
      playerScore: '',
    };
    try {
      await axios.post('http://localhost:3000/users', user);
      this.socketService.createUser(user);
    } catch (x) {
      console.log(x);
    }
  }
}
