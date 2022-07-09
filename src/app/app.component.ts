import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planning-poker';
  card = ''
  receivedMessage($event: any){
    this.card = $event
    console.log('app-component')
    console.log($event)
  }
}
