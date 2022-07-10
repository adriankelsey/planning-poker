import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    PlayerComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
