import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import axios from 'axios';
import Axios from 'axios-observable';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { StateService } from '../services/shared-service';
import { SocketService } from '../services/socket.service';
import { PlayerCard } from '../main-component/models/card.model';
import {
  isVisibleRecievedMessage,
  MainComponent,
} from '../main-component/main.component';

export interface User {
  name: any;
  score: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'score', 'test'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  players: BehaviorSubject<any> = new BehaviorSubject<any>('');
  visible: boolean = true;
  constructor(
    public stateService: StateService,
    public socketService: SocketService,
    public router: Router
  ) {
    this.stateService.userData.subscribe((value) => {
      this.dataSource = value;
      this.stateService.averageScore.next(value);
    });
    this.stateService.scoresVisible.subscribe(
      (value: isVisibleRecievedMessage) => {
        if (value.content) this.visible = value.content.visible;
      }
    );
  }

  @Input() data: any;

  async ngOnInit() {
    this.socketService.connect();
    this.socketService.onConnection();
  }
}
