import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor() {}

  public async createUser(name: string, id: string) {
    const user: User = {
      id: id,
      playerName: name,
      playerScore: '',
    };
    try {
      await axios.post('http://localhost:3000/users/login', user);
    } catch (x) {
      console.log(x);
    }
  }

  public async getUsers() {
    const user = await axios.get('http://localhost:3000/users');
  }
}
