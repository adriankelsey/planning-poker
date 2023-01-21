import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { StateService } from '../services/shared-service';
import { PlayerCard } from './models/card.model';
import { SocketService } from '../services/socket.service';

export type isVisibleRecievedMessage = {
  msge: string;
  content: {
    votingPhase: string;
    visible: boolean;
  };
};

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

  finishButtonIsVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  scoresVisible = false;

  constructor(
    public menuComponent: MenuComponent,
    public stateService: StateService,
    public socketService: SocketService
  ) {
    this.socketService.onPlayerScore();
    this.stateService.scoresVisible.subscribe(
      (isVisible: isVisibleRecievedMessage) => {
        if (isVisible) {
          switch (isVisible.content.votingPhase) {
            case 'start vote':
              this.votingPhases.startVisible = false;
              this.votingPhases.finishVisible = true;
              break;
            case 'finish vote':
              this.votingPhases.resetVisible = true;
              this.votingPhases.rescoreVisible = true;
              this.votingPhases.finishVisible = false;
              break;
            case 'reset vote':
              this.votingPhases.resetVisible = false;
              this.votingPhases.rescoreVisible = false;
              this.votingPhases.startVisible = true;
              break;
            case 're-score vote':
              this.votingPhases.finishVisible = true;
              this.votingPhases.rescoreVisible = false;
              this.votingPhases.resetVisible = false;
              break;
          }
        }
      }
    );
  }

  async ngOnInit(): Promise<void> {}

  async getUsers() {
    const users = await axios.get('http://localhost:3000/users');
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

  async getUserStates() {
    const usersStates = await axios.get(
      'http://localhost:3000/users/playerScore'
    );
    return usersStates.data;
  }

  async startVote() {
    this.socketService.sendIsVisible(false, 'start vote');
  }

  async finishVote() {
    this.socketService.sendIsVisible(true, 'finish vote');
  }

  async resetVote() {
    this.socketService.sendIsVisible(true, 'reset vote');
  }

  rescoreVote() {
    this.socketService.sendIsVisible(false, 're-score vote');
  }
}
