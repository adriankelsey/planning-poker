import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as uuid from 'uuid';
import { PlayerComponent } from '../player/player.component';
import { StateService } from '../services/shared-service';
import { SocketService } from '../services/socket.service';
import { TableComponent } from '../table/table.component';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private playerComponent: PlayerComponent,
    private tableComponent: TableComponent,
    private sharedService: StateService,
    private usersService: UsersService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {}

  async login(name: string) {
    const id = uuid.v4();
    await this.usersService.createUser(name, id);
    localStorage.setItem('playerName', name);
    localStorage.setItem('playerId', id);
    this.router.navigateByUrl('/table');
  }
}
