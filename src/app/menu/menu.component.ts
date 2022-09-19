import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { PlayerCard } from '../table/models/card.model';


export interface User {
  name: any,
  score: string,
  rescore: number | null
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'score', 'rescore']
  data = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
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

  async ngOnInit(): Promise<void> {
    this.getUsers()
  }

  async getUsers() {
    const users = await axios.get('http://localhost:3000/users')

    this.dataSource = new MatTableDataSource(users.data)
  
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
