import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import Axios from 'axios-observable';
import { BehaviorSubject, Observable } from 'rxjs';
import { StateService } from '../services/shared-service';
import { SocketService } from '../services/socket.service';
import { PlayerCard } from '../table/models/card.model';
import { TableComponent } from '../table/table.component';

export interface User {
  name: any;
  score: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  displayedColumns: string[] = ['name', 'score'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  ticket = {
    editVisible: false,
    headerVisible: true,
    name: 'Ticket Here',
  };
  players: BehaviorSubject<any> = new BehaviorSubject<any>('');
  visible: boolean = true;

  constructor(
    public stateService: StateService,
    public socketService: SocketService
  ) {
    this.stateService.createPlayer.subscribe((value) => {
      this.dataSource = value;
    });
    this.stateService.playerScore.subscribe((value) => {
      console.log(value);
      this.dataSource = value;
    });
    this.stateService.scoresVisible.subscribe((value) => {
      this.visible = value.content;
    });
  }

  @Input() data: any;

  async ngOnInit() {}

  editTicket() {
    this.ticket.editVisible = true;
    this.ticket.headerVisible = false;
  }

  editTicketName(value: string) {
    this.ticket.name = value;
    this.ticket.editVisible = false;
    this.ticket.headerVisible = true;
  }
}
