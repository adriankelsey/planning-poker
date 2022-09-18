import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  players: string[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async enterGame(name: string) {
    localStorage.setItem('username', name)
    this.router.navigateByUrl('/table')
    this.players.push(name)
    const response = await axios.post('http://localhost:3000/login', {
      playerName: name
    })
  }

}
