import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableComponent } from '../table-component/table.component';
import { StateService } from '../services/shared.service';
import { PlayerCard } from './models/card.model';
import { SocketService } from '../services/socket.service';
import { PlayerState } from './models/player-state.model';

export type isVisibleRecievedMessage = {
  msge: string;
  content: {
    votingPhase: string;
    visible: boolean;
  };
};

@Component({
  selector: 'app-table',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
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
  @ViewChild('averageScore')
  averageScoreElement: ElementRef<HTMLElement> | undefined;
  averageScoreResize: BehaviorSubject<number> = new BehaviorSubject(100);
  windowWidth: BehaviorSubject<number> = new BehaviorSubject(0);
  windowHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(
    public menuComponent: TableComponent,
    public stateService: StateService,
    public socketService: SocketService,
    private renderer: Renderer2
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
  ngAfterViewInit(): void {
    console.log(innerWidth);
    console.log(innerHeight);
    this.windowWidth.next(innerWidth);
    this.windowHeight.next(innerHeight);
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    if (innerWidth < this.windowWidth.getValue()) {
      this.renderer.setStyle(
        this.averageScoreElement?.nativeElement,
        'height',
        `${20 - (this.windowWidth.getValue() - innerWidth) / 100}%`
      );
    }

    if (innerWidth === 1920) {
      this.renderer.setStyle(
        this.averageScoreElement?.nativeElement,
        'height',
        `20%`
      );
    }

    if (innerWidth === 1440) {
      this.renderer.setStyle(
        this.averageScoreElement?.nativeElement,
        'height',
        `20%`
      );
    }
  }

  async ngOnInit(): Promise<void> {}

  async getUsers() {
    const users = await axios.get('http://localhost:3000/users');
    return users.data;
  }

  async receivedMessage($event: number) {
    const playerName = localStorage.getItem('playerName') ?? '';
    const uuid = localStorage.getItem('playerId');
    const playerScore = $event;

    const playerState: PlayerState = {
      playerName: playerName,
      id: uuid,
      playerScore: playerScore,
      voted: true,
    };

    if (playerScore === null) playerState.voted = false;
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
