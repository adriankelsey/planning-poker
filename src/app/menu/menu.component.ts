import { Component, Injectable, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { PlayerCard } from '../table/models/card.model';


export interface User {
  name: any,
  score: string,
  rescore: number | null
}


const myDataArry: any[] = []

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'score', 'rescore']
  dataSource = myDataArry
  users: any[] = []
  ticket = {
    editVisible: false,
    headerVisible: true,
    name: 'Ticket Here'
  }
  @Input() player: PlayerCard = {
    score: '',
    visible: false
  }

  constructor() { 
  }

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers() {
    const users = await axios.get('http://localhost:3000/users')
    myDataArry.push(users)
    console.log(this.users)
  }

  editTicket() {
    this.ticket.editVisible = true
    this.ticket.headerVisible = false
  }

  editTicketName(value: string) {
    this.ticket.name = value
    this.ticket.editVisible = false
    this.ticket.headerVisible = true
  }

}
