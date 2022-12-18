import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as uuid from 'uuid';
import { PlayerComponent } from '../player/player.component';
import { SharedService } from '../services/shared-service';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private playerComponent: PlayerComponent, private tableComponent: TableComponent, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  async enterGame(name: string) {
    const id = uuid.v4()
    this.router.navigateByUrl('/table')
    
    await axios.post('http://localhost:3000/users/login', {
      playerName: name,
      id: id,
      playerScore: ''
    })

    localStorage.setItem('playerName', name)
    localStorage.setItem('playerId', id)

    const createdPlayer = await this.playerComponent.createPlayer(id)

    const users = await axios.get('http://localhost:3000/users')
    this.sharedService.subject.next(users.data)

    this.tableComponent.getPlayer(createdPlayer)
  }
}
