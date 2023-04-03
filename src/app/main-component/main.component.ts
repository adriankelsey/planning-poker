import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import axios from "axios";
import { TableComponent } from "../table-component/table.component";
import { StateService } from "../services/shared.service";
import { SocketService } from "../services/socket.service";
import { PlayerState } from "./models/player-state.model";
import { BehaviorSubject, Subject } from "rxjs";

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
	nextPert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	pertStage$: BehaviorSubject<string> = new BehaviorSubject("");
	votingStage$: BehaviorSubject<string> = new BehaviorSubject("");
	resetPertScoring$: Subject<boolean> = new Subject();
	finishPertScoring: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
	ngAfterViewInit(): void {}

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
		this.nextPert$.next(false);
		this.votingStage$.next("START_VOTE");
	}

	nextPertOrFinish(): void {
		this.votingStage$.next("START_VOTE");

		if (this.pertStage$.getValue() === "pessimistic") {
			this.finishPertScoring.next(true);
		} else {
			this.nextPert$.next(true);
		}
	}

	previousPert(): void {
		this.nextPert$.next(false);
		this.votingStage$.next("RESET_VOTE");
	}

	// get output from pert componenet
	// if current pert is pessimistic return 'finish' else 'next'
	getNextOrFinishPertLabel(): string {
		return this.pertStage$.getValue() === "pessimistic" ? "Finish" : "Next";
	}

	getPertStage($event: string): void {
		this.pertStage$.next($event);
	}

	resetPertScoring(): void {
		this.resetPertScoring$.next(true);
	}
}
