import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";
import { StateService } from "../services/shared.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";

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

	constructor(stateService: StateService, private renderer: Renderer2, private element: ElementRef) {
		stateService.userData.subscribe((usersData) => {
			console.log(usersData);
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
				console.log(scoreVisible.content.visible);
				this.scoreVisible.next(scoreVisible.content.visible);
			}
		});

		stateService.averageScore.subscribe((value) => {
			this.averageScore.next(value);
		});

		this.scoreVisible.subscribe((value) => {
			console.log(value);
		});

		console.log("optimistic score: " + this.optimisticScore.getValue());
		console.log("most likely score: " + this.mostLikelyScore.getValue());
		console.log("pessimistice score: " + this.pessimisticScore.getValue());
	}
	ngAfterViewInit(): void {}

	ngOnInit(): void {
		this.optimisticElement = document.getElementById("optimistic")!;
		this.mostLikelyElement = document.getElementById("most-likely")!;
		this.pessimisticElement = document.getElementById("pessimistic")!;
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
		this.currentPert.next("optimistic");
		this.renderer.setStyle(this.optimisticElement, "background", "rgba(160, 219, 255, 0.628)");
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopOptimisticScoring() {
		this.renderer.setStyle(this.optimisticElement, "background", "rgb(223, 223, 223)");

		this.optimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	startMostLikelyScoring() {
		this.currentPert.next("most likely");
		this.renderer.setStyle(this.mostLikelyElement, "background", "rgba(160, 219, 255, 0.628)");
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopMostLikelyScoring() {
		this.renderer.setStyle(this.mostLikelyElement, "background", "rgb(223, 223, 223)");
		this.mostLikelyScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	startPessimisticScoring() {
		this.currentPert.next("pessimistic");
		this.renderer.setStyle(this.pessimisticElement, "background", "rgba(160, 219, 255, 0.628)");
		this.pessimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}

	stopPessimisticScoring() {
		this.renderer.setStyle(this.pessimisticElement, "background", "rgb(223, 223, 223)");
		this.pessimisticScore.next({
			playerScore: this.playerScore.getValue(),
			averageScore: this.averageScore.getValue(),
		});
		this.pertStageEvent.emit(this.currentPert.getValue());
	}
}
