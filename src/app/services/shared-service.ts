import { BehaviorSubject } from 'rxjs';

export class StateService {
  createPlayer: BehaviorSubject<any> = new BehaviorSubject<any>('');

  playerScore: BehaviorSubject<any> = new BehaviorSubject<any>('');

  scoresVisible: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() {}
}
