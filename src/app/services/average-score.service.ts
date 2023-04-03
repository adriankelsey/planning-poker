import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateService } from "./shared.service";

@Injectable()
export class AverageScoreService {
	averageScore: BehaviorSubject<number> = new BehaviorSubject(0);
	users: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);

	constructor(private stateService: StateService) {
		console.log("hello");
		this.stateService.userData.subscribe((userData) => {
			console.log;
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
				if (users[i].playerScore) scores.push(users[i].playerScore);
			}

			if (scores.length > 0) {
				let updatedScore: any = [];
				scores.forEach((score) => {
					if (score !== "?") updatedScore.push(score);
				});
				let sum = updatedScore.reduce((a: string, b: string) => parseInt(a) + parseInt(b));
				let average = sum / updatedScore.length;

				this.averageScore.next(Math.round((average + Number.EPSILON) * 100) / 100);

				this.stateService.averageScore.next(Math.round((average + Number.EPSILON) * 100) / 100);
			}
		});

		console.log(this.averageScore.getValue());
	}
}
