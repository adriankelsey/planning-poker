import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(cardsComponent: CardsComponent) { }

  ngOnInit(): void {
    
  }

  async createPlayer(id: string) {
    const response = await axios.get('http://localhost:3000/users')
    let player = {
      name: undefined,
      id : id
    }

    response.data.forEach((element: any) => {
      if(element.id == id) {
        player.name = element.playerName
      }
    });

    console.log(player)
  }
}
