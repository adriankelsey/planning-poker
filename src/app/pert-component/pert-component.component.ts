import {
  AfterViewInit,
  Component,
  ElementRef,
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
  @ViewChild('redChip')
  chip: ElementRef<HTMLElement> | undefined;
  bindingVar = '';
  constructor(stateService: StateService, private renderer: Renderer2) {
    stateService.userData.subscribe((usersData) => {
      if (usersData)
        usersData.forEach((user: any) => {
          if (user.id === localStorage.getItem('playerId')) {
            this.showChip(user.voted);
          }
        });
    });

    this.getImgChip();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  showChip(voted: boolean) {
    if (voted) {
      this.animateFall();
    } else {
      this.reset();
    }
  }

  getImgChip() {}

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
}
