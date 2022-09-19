import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MenuComponent } from '../menu/menu.component';
import { PlayerCard } from './models/card.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  player: any

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

  constructor(private menuComponent: MenuComponent) { }

  ngOnInit(): void {}

  getPlayer(player: any) {
    localStorage.setItem(player.name, player.id)
  }

  async receivedMessage($event: any){
    const playerName = localStorage.getItem('playerName') ?? ''
    const uuid = localStorage.getItem(playerName);
    const playerScore = $event

    const playerState = {
      playerName: playerName,
      uuid: uuid,
      playerScore: playerScore   
    }

    axios.post('http://localhost:3000/state', playerState)

    this.playerState.uuid = playerState.uuid
  }

  startVote() {
    this.votingPhases.banner = 'VOTING HAS STARTED'
    this.votingPhases.finishVisible = true
    this.votingPhases.startVisible = false
  }

  async finishVote() {
    this.votingPhases.banner = 'VOTING HAS FINISHED'
    this.votingPhases.finishVisible = false
    this.votingPhases.resetVisible = true
    this.votingPhases.rescoreVisible = true
    this.playerState.visible = true

    const response = await axios.get('http://localhost:3000/state')

    this.menuComponent.getUsersState(response)
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
  

}
