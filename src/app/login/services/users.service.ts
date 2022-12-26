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

  public createUser(name: string, id: string) {
    const user: User = {
      id: id,
      playerName: name,
      playerScore: '',
    };
    try {
      this.socketService.createUser(user);
    } catch (x) {
      console.log(x);
    }
  }
}
