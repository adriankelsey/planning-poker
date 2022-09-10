import { Component, OnInit } from '@angular/core';
import { PlayerCard } from './models/card.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  playerCard: PlayerCard[] = []

  card: PlayerCard = {
    score: '',
    visible: false
  }

  votingPhases = {
    banner: '',
    cardVisible: false,
    startVisible: true,
    finishVisible: false,
    resetVisible: false,
    rescoreVisible: false
  }

  constructor() { }

  ngOnInit(): void {}

  receivedMessage($event: any){
    this.card.score = $event
  }

  startVote() {
    this.votingPhases.banner = 'VOTING HAS STARTED'
    this.votingPhases.finishVisible = true
    this.votingPhases.startVisible = false
  }

  finishVote() {
    this.votingPhases.banner = 'VOTING HAS FINISHED'
    this.votingPhases.finishVisible = false
    this.votingPhases.resetVisible = true
    this.votingPhases.rescoreVisible = true
    this.card.visible = true
  }

  resetVote() {
    this.votingPhases.banner = ''
    this.votingPhases.resetVisible = false
    this.votingPhases.rescoreVisible = false
    this.votingPhases.startVisible = true
    this.card.visible = false
  }  

  rescoreVote() {
    this.votingPhases.banner = "RESCORING"
    this.votingPhases.resetVisible = false
    this.votingPhases.rescoreVisible = false
    this.votingPhases.finishVisible = true
    this.card.visible = false
  }
  

}
