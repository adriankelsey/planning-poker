import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";
import { StateService } from "../services/shared.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AverageScoreService } from "../services/average-score.service";

@Component({
	selector: "app-pert-component",
	templateUrl: "./pert-component.component.html",
	styleUrls: ["./pert-component.component.scss"],
	animations: [
		trigger("someCoolAnimation", [
			state(
				"fall",

				style({ transform: "translateY(135px)" })
			),

			state("reset", style({ transform: "translateY(0px)" })),
			transition("* => reset", [animate(0)]),
			transition("* => fall", [
				animate(
					"1s",
					keyframes([
						style({ transform: "rotate(5deg)" }),
						style({ transform: "rotate(-5deg)" }),
						style({ transform: "rotate(5deg)" }),
						style({ transform: "rotate(-5deg)" }),
						style({ transform: "rotate(5deg)" }),
						style({ transform: "rotate(-5deg)" }),
						style({ transform: "rotate(5deg)" }),
						style({ transform: "rotate(-5deg)" }),
						style({ transform: "translateY(50px)" }),
						style({ transform: "translateY(100px)" }),
					])
				),
			]),
		]),
	],
})
export class PertComponentComponent implements AfterViewInit {
	@Input() enablePert: Observable<boolean> | undefined;
	@Input() nextPert$: Observable<boolean> | undefined;
	@Input() finishPertScoring$: Observable<boolean> | undefined;

	@Output() pertStageEvent: EventEmitter<string> = new EventEmitter();

	@ViewChild("redChip")
	chip: ElementRef<HTMLElement> | undefined;

	bindingVar = "";
	voted: BehaviorSubject<boolean> = new BehaviorSubject(false);
	playerScore: BehaviorSubject<number> = new BehaviorSubject(0);
	optimisticScore: BehaviorSubject<any> = new BehaviorSubject({});
	mostLikelyScore: BehaviorSubject<any> = new BehaviorSubject({});
	pessimisticScore: BehaviorSubject<any> = new BehaviorSubject({});
	scoreVisible: Subject<boolean> = new Subject();
	averageScore: BehaviorSubject<number> = new BehaviorSubject(0);
	currentPert: BehaviorSubject<string> = new BehaviorSubject("");
	optimisticElement: HTMLElement | undefined;
	mostLikelyElement: HTMLElement | undefined;
	pessimisticElement: HTMLElement | undefined;

	pertScore$: Subject<number> = new Subject();

	constructor(stateService: StateService, private renderer: Renderer2, private averageScoreService: AverageScoreService) {
		this.averageScoreService.averageScore;

		averageScoreService.averageScore.subscribe((averageScore) => {
			this.averageScore.next(averageScore);
		});

		stateService.userData.subscribe((usersData) => {
			if (usersData)
				usersData.forEach((user: any) => {
					if (user.id === localStorage.getItem("playerId")) {
						this.showChip(user.voted);
						this.voted.next(user.voted);
						this.playerScore.next(user.playerScore);
					}
				});
		});

		stateService.scoresVisible.subscribe((scoreVisible) => {
			if (scoreVisible) {
				this.scoreVisible.next(scoreVisible.content.visible);
			}
		});
	}
	ngAfterViewInit(): void {}

	ngOnInit(): void {
		this.optimisticElement = document.getElementById("optimistic")!;
		this.mostLikelyElement = document.getElementById("most-likely")!;
		this.pessimisticElement = document.getElementById("pessimistic")!;

		this.startOptimisticScoring();

		this.nextPert$?.subscribe((value) => {
			if (value === true) {
				this.nextPert();
			} else {
				this.previousPert();
			}
		});

		this.enablePert?.subscribe((value) => {
			if (value === true) {
				this.startOptimisticScoring();
				this.nextPert$?.subscribe((value) => {
					if (value === true) {
						this.nextPert();
					} else {
						this.previousPert();
					}
				});
			}
		});

		this.finishPertScoring$?.subscribe((value) => {
			if (value === true) {
				this.finishPertScoring();
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
		this.bindingVar = "fall";
	}

	reset() {
		this.bindingVar = "reset";
	}

	toggle() {
		this.bindingVar == "fall" ? this.reset() : this.animateFall();
		console.log(this.bindingVar);
	}

	startPert() {
		this.startOptimisticScoring();
	}

	nextPert() {
		if (this.currentPert.getValue() === "optimistic") {
			this.startMostLikelyScoring();
			this.stopOptimisticScoring();
			console.log(this.optimisticScore.getValue());
		} else if (this.currentPert.getValue() === "most likely") {
			this.stopMostLikelyScoring();
			this.startPessimisticScoring();
		} else if (this.currentPert.getValue() === "pessimistic") {
		}
	}

	previousPert() {
		if (this.currentPert.getValue() === "optimistic") {
		} else if (this.currentPert.getValue() === "most likely") {
			this.startOptimisticScoring();
			this.stopMostLikelyScoring();
		} else if (this.currentPert.getValue() === "pessimistic") {
			this.startMostLikelyScoring();
			this.stopPessimisticScoring();
		}
	}

	startOptimisticScoring() {
		this.styleElementStartScoring(this.optimisticElement);
		this.currentPert.next("optimistic");
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopOptimisticScoring() {
		this.styleElementStopScoring(this.optimisticElement);

		this.optimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	startMostLikelyScoring() {
		this.styleElementStartScoring(this.mostLikelyElement);
		this.currentPert.next("most likely");
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopMostLikelyScoring() {
		this.styleElementStopScoring(this.mostLikelyElement);
		this.mostLikelyScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	startPessimisticScoring() {
		this.styleElementStartScoring(this.pessimisticElement);
		this.currentPert.next("pessimistic");
		this.pessimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopPessimisticScoring() {
		this.styleElementStopScoring(this.pessimisticElement);
		this.pessimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	finishPertScoring() {
		this.stopPessimisticScoring();
		this.scoreVisible.next(true);
		const optimisticScore = this.optimisticScore.getValue().averageScore;
		const mostLikelyScore = this.mostLikelyScore.getValue().averageScore;
		const pessimisticScore = this.pessimisticScore.getValue().averageScore;

		// PERT calculation
		// E = (O + 4M + P) / 6
		const pertScore = Math.round((optimisticScore + mostLikelyScore * 4 + pessimisticScore) / 6);

		this.pertScore$.next(pertScore);

		this.pertScore$.subscribe((value) => {
			console.log(value);
		});
	}

	styleElementStartScoring(element?: HTMLElement): void {
		this.renderer.setStyle(element, "background", "rgba(160, 219, 255, 0.628)");
	}

	styleElementStopScoring(element?: HTMLElement): void {
		this.renderer.setStyle(element, "background", "rgb(223, 223, 223)");
	}
}
