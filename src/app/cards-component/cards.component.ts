import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  clickedCard$: BehaviorSubject<number> = new BehaviorSubject(0);
  clickedCards: number[] = [];
  isPrevious$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
  ngOnInit(): void {}

  @Output() cardEvent: EventEmitter<any> = new EventEmitter<any>();
  async onClick(event: Event) {
    const elementId = (event.target as Element).id;
    const card = document.getElementById(elementId);

    if (card) this.highlightSelectedCard(card, false);

    this.clickedCards.push(this.clickedCard$.getValue());

    if (this.clickedCards.length > 1) {
      const previousCard = document.getElementById(
        this.clickedCards[0].toString()
      );
      if (previousCard) this.highlightSelectedCard(previousCard, true);
      console.log(this.clickedCards[0]);
      this.clickedCards.shift();
    }
  }

  highlightSelectedCard(card: HTMLElement, isPrevious: boolean) {
    if (parseInt(card.id) === this.clickedCard$.getValue()) {
      this.clickedCard$.next(0);
      card.style.background = 'rgba(189, 189, 189, 0.144);';
      card.style.borderRadius = '10px';
      this.cardEvent.emit(null);
    } else if (isPrevious) {
      card.style.background = 'rgba(189, 189, 189, 0.144)';
    } else {
      this.clickedCard$.next(parseInt(card.id));
      card.style.background = 'rgba(255, 0, 0, 0.144)';
      card.style.borderRadius = '10px';
      this.cardEvent.emit(this.clickedCard$.getValue());
    }
  }

  mouseOver(event: Event) {
    // const elementId = (event.target as Element).id;
    // const card = document.getElementById(elementId);
    // const unClickedCard = document.getElementById(this.unClickedCard[0]);
    // const clickedCard = document.getElementById(this.clickedCard[0]);
    // if (unClickedCard) unClickedCard.style.background = 'white';
    // if (card != null) {
    //   if (card === clickedCard) {
    //     card.style.background = 'rgba(255, 0, 0, 0.144)';
    //     card.style.borderRadius = '10px';
    //   } else {
    //     card.style.background = 'rgba(255, 0, 0, 0.144)';
    //     card.style.borderRadius = '10px';
    //   }
    // }
  }

  mouseOut(event: Event) {
    // const elementId = (event.target as Element).id;
    // const card = document.getElementById(elementId);
    // const clickedCard = document.getElementById(this.clickedCard[0]);
    // if (!clickedCard) {
    //   if (card != null) card.style.background = 'rgba(189, 189, 189, 0.144)';
    // }
    // if (card?.id != clickedCard?.id && clickedCard != null) {
    //   if (card != null) card.style.background = 'rgba(189, 189, 189, 0.144)';
    // }
  }
}
