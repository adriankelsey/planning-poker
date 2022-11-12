import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import  Axios from  'axios-observable';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../services/shared-service';
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
  players: BehaviorSubject<any> = new BehaviorSubject<any>('')

  constructor(public sharedService:SharedService) { 
    this.sharedService.subject.subscribe((value) => {
      this.dataSource.data = value
    })
  }

  @Input() data: any


  ngOnInit() {
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

  test() {
    
  }

}
