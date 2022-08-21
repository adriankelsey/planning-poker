import { Component, OnInit } from '@angular/core';
import { PlayerCard } from './models/card.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  show = false

  playerCard: PlayerCard[] = []

  votingPhase = {
    phase: '',
    banner: '',
    enabled: false,
  }

  card: PlayerCard = {
    score: '',
    visible: false
  }

  constructor() { }

  ngOnInit(): void {
    this.votingPhase.phase = 'Start Vote'
  }

  receivedMessage($event: any){
    this.card.score = $event
  }

  votePhase() {
    if(this.votingPhase.phase == 'Start Vote') {
      this.votingPhase.phase = 'Finish Vote'
      this.votingPhase.banner = 'Voting has started'
      this.votingPhase.enabled = true
      this.show = false
    } else if (this.votingPhase.phase == 'Finish Vote') {
      // countdown before turning over cards
      // also think about rescoring feature 
      this.show = true
      this.votingPhase.phase = 'Start Vote'
      this.votingPhase.enabled = false
      this.votingPhase.banner = ''
    }
  } 
}
