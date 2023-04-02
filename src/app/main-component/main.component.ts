import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import axios from "axios";
import { TableComponent } from "../table-component/table.component";
import { StateService } from "../services/shared.service";
import { SocketService } from "../services/socket.service";
import { PlayerState } from "./models/player-state.model";
import { BehaviorSubject } from "rxjs";

export type isVisibleRecievedMessage = {
	msge: string;
	content: {
		votingPhase: string;
		visible: boolean;
	};
};

@Component({
	selector: "app-table",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements AfterViewInit {
	enablePert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	nextPert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	pertStage$: BehaviorSubject<string> = new BehaviorSubject("");
	votingStage$: BehaviorSubject<string> = new BehaviorSubject("");

	playerState: any = {
		score: "",
		visible: true,
		uuid: undefined,
	};

	finishButtonIsVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	scoresVisible = false;
	@ViewChild("averageScore")
	averageScoreElement: ElementRef<HTMLElement> | undefined;
	averageScoreResize: BehaviorSubject<number> = new BehaviorSubject(100);
	windowWidth: BehaviorSubject<number> = new BehaviorSubject(0);
	windowHeight: BehaviorSubject<number> = new BehaviorSubject(0);
	constructor(public menuComponent: TableComponent, public stateService: StateService, public socketService: SocketService) {
		this.socketService.onPlayerScore();
		this.stateService.scoresVisible.subscribe((isVisible: isVisibleRecievedMessage) => {
			if (isVisible) {
				switch (isVisible.content.votingPhase) {
					case "start vote":
						this.votingStage$.next("START_VOTE");
						break;
					case "finish vote":
						this.votingStage$.next("FINISH_VOTE");
						break;
					case "reset vote":
						this.votingStage$.next("RESET_VOTE");
						break;
					case "re-score vote":
						this.votingStage$.next("RESCORE_VOTE");
						break;
				}
			}
		});
	}
	ngAfterViewInit(): void {
		this.windowWidth.next(innerWidth);
		this.windowHeight.next(innerHeight);
	}

	// @HostListener('window:resize', ['$event.target'])
	// onResize() {
	//   if (innerWidth < this.windowWidth.getValue()) {
	//     this.renderer.setStyle(
	//       this.averageScoreElement?.nativeElement,
	//       'height',
	//       `${20 - (this.windowWidth.getValue() - innerWidth) / 100}%`
	//     );
	//   }

	//   if (innerWidth === 1920) {
	//     this.renderer.setStyle(
	//       this.averageScoreElement?.nativeElement,
	//       'height',
	//       `20%`
	//     );
	//   }

	//   if (innerWidth === 1440) {
	//     this.renderer.setStyle(
	//       this.averageScoreElement?.nativeElement,
	//       'height',
	//       `20%`
	//     );
	//   }
	// }

	async ngOnInit(): Promise<void> {
		if (!this.votingStage$.getValue()) this.votingStage$.next("START_VOTE");
	}

	async getUsers() {
		const users = await axios.get("http://localhost:3000/users");
		return users.data;
	}

	async receivedMessage($event: number) {
		const playerName = localStorage.getItem("playerName") ?? "";
		const uuid = localStorage.getItem("playerId");
		const playerScore = $event;

		const playerState: PlayerState = {
			playerName: playerName,
			id: uuid,
			playerScore: playerScore,
			voted: true,
		};

		if (playerScore === null) playerState.voted = false;
		this.socketService.sendPlayerScore(playerState);
	}

	async getUserStates() {
		const usersStates = await axios.get("http://localhost:3000/users/playerScore");
		return usersStates.data;
	}

	async startVote() {
		this.socketService.sendIsVisible(false, "finish vote");
	}

	async finishVote() {
		this.socketService.sendIsVisible(true, "reset vote");
	}

	async resetVote() {
		this.socketService.sendIsVisible(true, "start vote");
	}

	rescoreVote() {
		this.socketService.sendIsVisible(false, "start vote");
	}

	enableOrDisablePert() {
		if (this.enablePert$.getValue() === true) {
			this.enablePert$.next(false);
			this.nextPert$.next(false);
		} else {
			this.enablePert$.next(true);
			this.votingStage$.next("START_VOTE");
		}
	}

	nextPert() {
		this.nextPert$.next(true);
		this.votingStage$.next("START_VOTE");
	}

	previousPert() {
		this.nextPert$.next(false);
		this.votingStage$.next("RESCORE_VOTE");
	}

	getEnablePertLabel(): string {
		return this.enablePert$.getValue() === true ? "Disable PERT Scoring" : "Enable PERT Scoring";
	}

	// get output from pert componenet
	// if current pert is pessimistic return 'finish' else 'next'
	getNextOrFinishPertLabel() {
		return this.pertStage$.getValue() === "pessimistic" ? "Finish" : "Next";
	}

	getPertStage($event: string) {
		this.pertStage$.next($event);
	}
}
