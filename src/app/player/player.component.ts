import { Component, OnInit } from '@angular/core';
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
  

}
