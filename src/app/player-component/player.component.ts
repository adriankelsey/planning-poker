import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { CardsComponent } from '../cards-component/cards.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
// move this component into it's own service
export class PlayerComponent implements OnInit {
  constructor(private cardsComponent: CardsComponent) {}

  ngOnInit(): void {}

  @Output() playerEvent: EventEmitter<any> = new EventEmitter<any>();
  async createPlayer(id: string) {
    const response = await axios.get('http://localhost:3000/users');
    let player = {
      playerName: undefined,
      id: id,
    };

    response.data.forEach((element: any) => {
      if (element.id == id) {
        player.playerName = element.playerName;
      }
    });

    return player;
  }
}
