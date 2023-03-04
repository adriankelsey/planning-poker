import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as uuid from 'uuid';
import { PlayerComponent } from '../player-component/player.component';
import { StateService } from '../services/shared.service';
import { SocketService } from '../services/socket.service';
import { MainComponent } from '../main-component/main.component';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService.connect();
  }

  async login(name: string) {
    if (localStorage.getItem('playerName')) {
      const id = localStorage.getItem('playerId');
      localStorage.removeItem('playerName');
      localStorage.setItem('playerName', name);
      await this.usersService.createUser(name, id);
      this.router.navigateByUrl('/table');
    } else {
      const id = uuid.v4();
      await this.usersService.createUser(name, id);
      localStorage.setItem('playerName', name);
      localStorage.setItem('playerId', id);
      this.router.navigateByUrl('/table');
    }
  }
}
