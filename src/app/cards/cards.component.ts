import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html', 
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  cards: string[] = []
  clickedCard: string[] = []
  constructor() {}
  ngOnInit(): void {
  }
  @Output() cardEvent:EventEmitter<any> = new EventEmitter<any>();
  onClick(event: Event) {
    const elementId = (event.target as Element).id;
    this.cardEvent.emit(elementId)

    const card = document.getElementById(elementId)

    if (card != null) {
      card.style.background = 'rgb(117, 82, 117)'
      this.clickedCard.push(card.id)
      if(this.clickedCard.length > 1) this.clickedCard.shift()
    }
    
    if (card?.id != undefined) this.cards.push(card?.id)

    for(let i = 0; i < this.cards.length; i++) {
      if(i > 0) {
        const previousCard = document.getElementById(this.cards[i - 1])
        if (previousCard != null) previousCard.style.background = 'white'
        this.cards.shift()
      }
    }
  }

  mouseOver(event: Event) {
    const elementId = (event.target as Element).id;
    const card = document.getElementById(elementId)
    if (card != null) card.style.background = 'rgb(117, 82, 117)'
  }

  mouseOut(event: Event) {
    const elementId = (event.target as Element).id;
    const card = document.getElementById(elementId)
    const clickedCard = document.getElementById(this.clickedCard[0])

    if (card?.id != clickedCard?.id && clickedCard != null) {
      if(card != null) card.style.background = 'white'
    } 
  }
}
