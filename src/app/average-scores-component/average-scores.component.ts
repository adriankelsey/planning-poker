import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../services/shared.service';

export type user = {
  id: string;
  playerName: string;
  playerScore: number;
};
@Component({
  selector: 'app-average-scores',
  templateUrl: './average-scores.component.html',
  styleUrls: ['./average-scores.component.scss'],
})
export class AverageScoresComponent implements OnInit {
  average: BehaviorSubject<number> = new BehaviorSubject(0);
  sum: BehaviorSubject<number> = new BehaviorSubject(0);
  users: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);
  isVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private stateService: StateService) {
    this.stateService.scoresVisible.subscribe((isVisible) => {
      if (isVisible) this.isVisible.next(isVisible.content.visible);
    });
    this.stateService.averageScore.subscribe((userData) => {
      if (userData) {
        let users: any[] = [];
        for (let i = 0; i < userData.length; i++) {
          if (users.length < userData.length) {
            users.push(userData[i]);
            this.users.next(users);
          }
        }
      }
    });

    this.users.subscribe((users) => {
      let scores = [];
      for (let i = 0; i < users.length; i++) {
        scores.push(users[i].playerScore);
      }

      if (scores.length > 0) {
        let sum = scores.reduce((a, b) => parseInt(a) + parseInt(b));
        let average = sum / scores.length;

        this.average.next(average);
      }
    });
  }

  ngOnInit(): void {}
}
