import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as uuid from 'uuid';
import { PlayerComponent } from '../player/player.component';
import { SharedService } from '../services/shared-service';
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
    private sharedService: SharedService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  async enterGame(name: string) {
    const id = uuid.v4();

    await this.usersService.createUser(name, id);

    localStorage.setItem('playerName', name);
    localStorage.setItem('playerId', id);

    const createdPlayer = await this.playerComponent.createPlayer(id);

    const users = await axios.get('http://localhost:3000/users');
    this.sharedService.subject.next(users.data);

    this.tableComponent.getPlayer(createdPlayer);
    this.router.navigateByUrl('/table');
  }
}
