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
  @Output() cardEvent = new EventEmitter<string>()
  onClick(event: Event) {
    const elementId = (event.target as Element).id;
    this.cardEvent.emit('elementId')
    console.log(elementId)
  }
}
