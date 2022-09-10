import { Component, Injectable, Input, OnInit } from '@angular/core';
import { PlayerCard } from '../table/models/card.model';


export interface User {
  name: string,
  score: string,
  rescore: number | null
}


const myDataArry: User[] = []

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'score', 'rescore']
  dataSource = myDataArry
  @Input() player: PlayerCard = {
    score: '',
    visible: false
  }

  constructor() { }

  ngOnInit(): void {
    this.createUser()
  }

  createUser() {
    const username = localStorage.getItem('username')
    const user: User = {
      name: username ?? '',
      score: this.player.score, 
      rescore: null
    }
    myDataArry.push(user)
  }

}
