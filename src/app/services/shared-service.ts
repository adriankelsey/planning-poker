import { BehaviorSubject } from 'rxjs';

export class StateService {
  userData: BehaviorSubject<any> = new BehaviorSubject<any>('');

  //playerScore: BehaviorSubject<any> = new BehaviorSubject<any>('');

  scoresVisible: BehaviorSubject<any> = new BehaviorSubject<any>('');

  averageScore: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() {}
}
