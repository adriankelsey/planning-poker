import { BehaviorSubject } from "rxjs";

export class StateService {
	userData: BehaviorSubject<any> = new BehaviorSubject<any>("");

	scoresVisible: BehaviorSubject<any> = new BehaviorSubject<any>("");

	constructor() {}
}
