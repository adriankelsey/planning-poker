import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { StateService } from '../services/shared-service';
import { PlayerCard } from './models/card.model';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  playerState: any = {
    score: '',
    visible: true,
    uuid: undefined,
  };

  votingPhases = {
    banner: '',
    cardVisible: false,
    startVisible: true,
    finishVisible: false,
    resetVisible: false,
    rescoreVisible: false,
  };

  scoresVisible = false;

  constructor(
    public menuComponent: MenuComponent,
    public stateService: StateService,
    public socketService: SocketService
  ) {
    this.socketService.getUsers();
    this.socketService.onPlayerScore();
  }

  async ngOnInit(): Promise<void> {
    this.socketService.getUsers();
    await this.getUsers();
  }

  async getUsers() {
    const users = await axios.get('http://localhost:3000/users');
    console.log(users.data);
    return users.data;
  }

  async receivedMessage($event: any) {
    const playerName = localStorage.getItem('playerName') ?? '';
    const uuid = localStorage.getItem('playerId');
    const playerScore = $event;

    const playerState = {
      playerName: playerName,
      id: uuid,
      playerScore: playerScore,
    };

    this.socketService.sendPlayerScore(playerState);
  }

  async startVote() {
    this.votingPhases.banner = 'VOTING HAS STARTED';
    this.votingPhases.finishVisible = true;
    this.votingPhases.startVisible = false;
    this.socketService.sendIsVisible(false);
  }

  async finishVote() {
    this.votingPhases.banner = 'VOTING HAS FINISHED';
    this.votingPhases.finishVisible = false;
    this.votingPhases.resetVisible = true;
    this.votingPhases.rescoreVisible = true;
    this.playerState.visible = true;
    this.socketService.sendIsVisible(true);
  }

  async resetVote() {
    this.votingPhases.banner = '';
    this.votingPhases.resetVisible = false;
    this.votingPhases.rescoreVisible = false;
    this.votingPhases.startVisible = true;
    this.playerState.visible = false;
  }

  rescoreVote() {
    this.votingPhases.banner = 'RESCORING';
    this.votingPhases.resetVisible = false;
    this.votingPhases.rescoreVisible = false;
    this.votingPhases.finishVisible = true;
    this.playerState.visible = false;
    this.stateService.scoresVisible.next(false);
  }

  async getUserStates() {
    const usersStates = await axios.get(
      'http://localhost:3000/users/playerScore'
    );
    return usersStates.data;
  }
}
