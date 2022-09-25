import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  Axios from  'axios-observable';
import { Observable } from 'rxjs';
import { PlayerCard } from '../table/models/card.model';
import { TableComponent } from '../table/table.component';


export interface User {
  name: any,
  score: string,

}

let users: any = []

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'score']
  dataSource: MatTableDataSource<any>= new MatTableDataSource()
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
    //const usersState = await axios.get('http://localhost:3000/state')
    //this.dataSource = usersState.data
  }

  async getUsers() {
    console.log('__________________')
    const usersStates = await Axios.get('http://localhost:3000/state')
    usersStates.subscribe((response) => {
      this.dataSource.data = response.data
      console.log(this.dataSource.data)
    })
  }

  //  async getUsersState(state: any) {
  //   const test = [{playerName: 'AKAAAA', id: '7029fb12-ba52-4674-9566-9e77d580dbf3'}]
  //   console.log('hello')
  //   this.dataSource.connect().next(test)

  
  // }

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
