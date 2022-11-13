import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html', 
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  players: any = []
  cards: string[] = []
  clickedCard: string[] = []
  unClickedCard: string[] = []
  constructor() {}
  ngOnInit(): void {
  }

  @Output() cardEvent:EventEmitter<any> = new EventEmitter<any>();
  async onClick(event: Event) {
    const elementId = (event.target as Element).id;
    this.cardEvent.emit(elementId)

    const card = document.getElementById(elementId)

    if(this.clickedCard[0] == card?.id) {
      this.unClickedCard.push(card.id)
      if(this.unClickedCard.length > 1) this.unClickedCard.shift()
    }



    if (card != null) {
      card.style.background = 'rgba(255, 0, 0, 0.144)'
      this.clickedCard.push(card.id)
      if(this.clickedCard.length > 1) this.clickedCard.shift()
    }
    
    if (card?.id != undefined) this.cards.push(card?.id)

    for(let i = 0; i < this.cards.length; i++) {
      if(i > 0) {
        const previousCard = document.getElementById(this.cards[i - 1])
        if (previousCard != null) previousCard.style.background = 'rgba(189, 189, 189, 0.144)'
        this.cards.shift()
      }
    }
  }

  mouseOver(event: Event) {
    const elementId = (event.target as Element).id;
    const card = document.getElementById(elementId)
    const unClickedCard = document.getElementById(this.unClickedCard[0])
    const clickedCard = document.getElementById(this.clickedCard[0])
    if(unClickedCard) unClickedCard.style.background = 'white'
    if (card != null) {
      if(card === clickedCard) {
        card.style.background = 'rgba(255, 0, 0, 0.144)'
        card.style.borderRadius = '10px'
      } else {
        card.style.background = 'rgba(255, 0, 0, 0.144)'
        card.style.borderRadius = '10px'
      }
    }
  }

  mouseOut(event: Event) {
    const elementId = (event.target as Element).id;
    const card = document.getElementById(elementId)
    const clickedCard = document.getElementById(this.clickedCard[0])

    if(!clickedCard) {
      if(card != null) card.style.background = 'rgba(189, 189, 189, 0.144)'
    }
    if (card?.id != clickedCard?.id && clickedCard != null) {
      if(card != null) card.style.background = 'rgba(189, 189, 189, 0.144)'
    } 
  }
}
