import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  player = {
    name:  ''
  }

  constructor() { }

  ngOnInit(): void {
    const player = localStorage.getItem('username')
    this.player.name = player!
  }

}
