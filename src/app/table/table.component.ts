import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { SharedService } from '../services/shared-service';
import { PlayerCard } from './models/card.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  playerState: any = {
    score: '',
    visible: true,
    uuid: undefined
  }

  votingPhases = {
    banner: '',
    cardVisible: false,
    startVisible: true,
    finishVisible: false,
    resetVisible: false,
    rescoreVisible: false
  }

  constructor(public menuComponent: MenuComponent, public sharedService: SharedService) { }

  test: string = 'harry'

  async ngOnInit(): Promise<void> {
    const userStates = await this.getUserStates()
    this.sharedService.subject.next(userStates)
  }


  getPlayer(player: any) {
    localStorage.setItem(player.name, player.id)
  }

  async receivedMessage($event: any){
    const playerName = localStorage.getItem('playerName') ?? ''
    const uuid = localStorage.getItem('playerId');
    const playerScore = $event

    const playerState = {
      playerName: playerName,
      id: uuid, 
      playerScore: playerScore   
    }

    axios.post('http://localhost:3000/state', playerState)
  }

  async startVote() {
    this.votingPhases.banner = 'VOTING HAS STARTED'
    this.votingPhases.finishVisible = true
    this.votingPhases.startVisible = false
  }

  async finishVote() {
    this.votingPhases.banner = 'VOTING HAS FINISHED'
    this.votingPhases.finishVisible = false
    this.votingPhases.resetVisible = true
    this.votingPhases.rescoreVisible = true
    this.playerState.visible = true;

    const userStates = await this.getUserStates()

    this.sharedService.subject.next(userStates)

    this.menuComponent.test()
  }

  resetVote() {
    this.votingPhases.banner = ''
    this.votingPhases.resetVisible = false
    this.votingPhases.rescoreVisible = false
    this.votingPhases.startVisible = true
    this.playerState.visible = false
  }  

  rescoreVote() {
    this.votingPhases.banner = "RESCORING"
    this.votingPhases.resetVisible = false
    this.votingPhases.rescoreVisible = false
    this.votingPhases.finishVisible = true
    this.playerState.visible = false
  }

    async getUserStates() {
    const usersStates = await axios.get('http://localhost:3000/state')
    return usersStates.data
  }
}
