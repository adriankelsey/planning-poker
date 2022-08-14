import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  votingPhase = {
    phase: '',
    banner: '',
    enabled: false,
  }

  card = ''

  constructor() { }

  ngOnInit(): void {
    this.votingPhase.phase = 'Start Vote'
  }

  receivedMessage($event: any){
    this.card = $event
  }

  startVote() {
    if(this.votingPhase.phase == 'Start Vote') {
      this.votingPhase.phase = 'Finish Vote'
      this.votingPhase.banner = 'Voting has started'
      this.votingPhase.enabled = true
      console.log(this.card)
    } else if (this.votingPhase.phase == 'Finish Vote') {
      // countdown before turning over cards
      // also think about rescoring feature 
      this.votingPhase.phase = 'Start Vote'
      this.votingPhase.banner = ''
    }
  } 
}
