import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as uuid from 'uuid';
import { PlayerComponent } from '../player/player.component';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private playerComponent: PlayerComponent, private tableComponent: TableComponent) { }

  ngOnInit(): void {
  }

  async enterGame(name: string) {
    const id = uuid.v4()
    this.router.navigateByUrl('/table')
    
    const response = await axios.post('http://localhost:3000/login', {
      playerName: name,
      id: id
    })

    localStorage.setItem('playerName', name)

    const createdPlayer = await this.playerComponent.createPlayer(id)

    this.tableComponent.getPlayer(createdPlayer)
  }
}
