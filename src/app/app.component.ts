import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planning-poker';
  card = '1'
  receivedMessage($event: any){
    this.card = $event
  }
}
