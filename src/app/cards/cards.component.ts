import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html', 
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  constructor() {}
  ngOnInit(): void {
  }
  @Output() cardEvent:EventEmitter<any> = new EventEmitter<any>();
  onClick(event: Event) {
    const elementId = (event.target as Element).id;
    this.cardEvent.emit(elementId)

    const card = document.getElementById(elementId)

    // TODO: Logic for if card is clicked stay highlighted with color & if another card is clicked undo color
    if (card != null)  {
      if(card.style.backgroundColor == 'rgb(117, 82, 117)') {
        card.style.backgroundColor = 'white'
      }
      card.style.backgroundColor = 'rgb(117, 82, 117)'
    }
  }
}
