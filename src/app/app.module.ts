import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CardsComponent } from "./cards-component/cards.component";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { PlayerComponent } from "./player-component/player.component";
import { MainComponent } from "./main-component/main.component";
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from "./login-component/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatInputModule } from "@angular/material/input";
import { TableComponent } from "./table-component/table.component";
import { StateService } from "./services/shared.service";
import { UsersService } from "./login-component/services/users.service";
import { SocketService } from "./services/socket.service";
import { PertComponentComponent } from "./pert-component/pert-component.component";
import { PertScoreComponent } from "./pert-score/pert-score.component";
import { AverageScoreService } from "./services/average-score.service";
@NgModule({
	declarations: [
		AppComponent,
		CardsComponent,
		PlayerComponent,
		MainComponent,
		LoginComponent,
		TableComponent,
		PertComponentComponent,
		PertScoreComponent,
	],
	imports: [
		BrowserModule,
		NoopAnimationsModule,
		MatCardModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatButtonModule,
		AppRoutingModule,
		MatInputModule,
		BrowserAnimationsModule,
	],
	providers: [PlayerComponent, CardsComponent, MainComponent, TableComponent, StateService, UsersService, SocketService, AverageScoreService],
	bootstrap: [AppComponent],
})
export class AppModule {}
