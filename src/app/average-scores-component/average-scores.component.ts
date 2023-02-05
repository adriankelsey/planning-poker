import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
export class AverageScoresComponent implements AfterViewInit {
  average: BehaviorSubject<number> = new BehaviorSubject(0);
  sum: BehaviorSubject<number> = new BehaviorSubject(0);
  users: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);
  isVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @ViewChild('progress')
  component: ElementRef<HTMLElement> | undefined;
  constructor(private stateService: StateService, private renderer: Renderer2) {
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

        this.average.next(Math.round(average));
      }
    });

    this.isVisible.subscribe((value) => {
      console.log(value);
      if (this.component) {
        let progressValue = 0;

        let interval = setInterval(() => {
          progressValue++;
          this.renderer.setStyle(
            this.component?.nativeElement,
            'background',
            `conic-gradient(#ffd63f  ${progressValue}deg, rgba(187, 187, 187, 0.333) 0deg)`
          );
          if (progressValue === 360) clearInterval(interval);
        }, 10);
      }
    });
  }
  ngAfterViewInit(): void {
    console.log('hello');
    console.log(this.component?.nativeElement);
  }

  ngOnInit(): void {
    console.log(this.component);
  }
}
