import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html', 
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  ngOnInit(): void {
  }

  clickCard(event: Event) {
    let elementId: string = (event.target as Element).id
    console.log(elementId)
  }

}
