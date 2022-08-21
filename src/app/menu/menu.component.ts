import { Component, OnInit } from '@angular/core';


export interface User {
  name: string,
  score: number,
  rescore: number | null
}


const myDataArry: User[] = [
{name: 'adrian', score: 2, rescore: 2}, 
{name: 'adrian', score: 2, rescore: 1}]

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'score', 'rescore']
  dataSource = myDataArry

  constructor() { }

  ngOnInit(): void {
    const player = localStorage.getItem('username')
  }

}
