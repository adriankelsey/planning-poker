import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { StateService } from '../services/shared.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pert-component',
  templateUrl: './pert-component.component.html',
  styleUrls: ['./pert-component.component.scss'],
  animations: [
    trigger('someCoolAnimation', [
      state(
        'fall',

        style({ transform: 'translateY(135px)' })
      ),

      state('reset', style({ transform: 'translateY(0px)' })),
      transition('* => reset', [animate(0)]),
      transition('* => fall', [
        animate(
          '1s',
          keyframes([
            style({ transform: 'rotate(5deg)' }),
            style({ transform: 'rotate(-5deg)' }),
            style({ transform: 'rotate(5deg)' }),
            style({ transform: 'rotate(-5deg)' }),
            style({ transform: 'rotate(5deg)' }),
            style({ transform: 'rotate(-5deg)' }),
            style({ transform: 'rotate(5deg)' }),
            style({ transform: 'rotate(-5deg)' }),
            style({ transform: 'translateY(50px)' }),
            style({ transform: 'translateY(100px)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PertComponentComponent implements AfterViewInit {
  @Input() enablePert: Observable<boolean> | undefined;
  @ViewChild('redChip')
  chip: ElementRef<HTMLElement> | undefined;
  bindingVar = '';
  voted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  playerScore: BehaviorSubject<number> = new BehaviorSubject(0);
  optimisticScore: BehaviorSubject<any> = new BehaviorSubject({});
  scoreVisble: Subject<boolean> = new Subject();
  averageScore: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    stateService: StateService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    stateService.userData.subscribe((usersData) => {
      console.log(usersData);
      if (usersData)
        usersData.forEach((user: any) => {
          if (user.id === localStorage.getItem('playerId')) {
            this.showChip(user.voted);
            this.voted.next(user.voted);
            this.playerScore.next(user.playerScore);
          }
        });
    });

    stateService.scoresVisible.subscribe((scoreVisible) => {
      if (scoreVisible) {
        console.log(scoreVisible.content.visible);
        this.scoreVisble.next(scoreVisible.content.visible);
      }
    });

    stateService.averageScore.subscribe((value) => {
      this.averageScore.next(value);
    });

    this.scoreVisble.subscribe((value) => {
      console.log(value);
    });
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.enablePert?.subscribe((value) => {
      if (value === true) {
        this.startPert();
      }
    });
  }

  showChip(voted: boolean) {
    if (voted) {
      this.animateFall();
    } else {
      this.reset();
    }
  }

  animateFall() {
    this.bindingVar = 'fall';
  }

  reset() {
    this.bindingVar = 'reset';
  }

  toggle() {
    this.bindingVar == 'fall' ? this.reset() : this.animateFall();
    console.log(this.bindingVar);
  }

  startPert() {
    this.startOptimisticScoring();
  }

  startOptimisticScoring() {
    let optimisticElement = document.getElementById('optimistic');
    this.renderer.setStyle(
      optimisticElement,
      'background',
      'rgba(160, 219, 255, 0.628)'
    );
  }
}
