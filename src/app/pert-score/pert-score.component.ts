import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
	selector: "app-pert-score",
	templateUrl: "./pert-score.component.html",
	styleUrls: ["./pert-score.component.scss"],
})
export class PertScoreComponent implements OnInit {
	@Input() pertScore$: Observable<number> | undefined;

	elementPertScore: HTMLElement | undefined;

	scoreProgress$: BehaviorSubject<number> = new BehaviorSubject(0);

	constructor(private renderer: Renderer2) {}

	ngOnInit(): void {
		this.elementPertScore = document.getElementById("pertScore")!;

		this.pertScore$?.subscribe((value) => {
			let progressValue = 0;
			let scoreProgress = 0;
			let averageInterval = value / 360;

			let progressInterval = setInterval(() => {
				progressValue++;
				scoreProgress = scoreProgress + averageInterval;
				this.scoreProgress$.next(Math.round((scoreProgress + Number.EPSILON) * 100) / 100);
				this.renderer.setStyle(
					this.elementPertScore,
					"background",
					`conic-gradient(rgb(160, 219, 255) ${progressValue}deg, rgba(187, 187, 187, 0.333) 0deg)`
				);
				if (progressValue === 360) clearInterval(progressInterval);
			}, 1);
		});
	}
}
