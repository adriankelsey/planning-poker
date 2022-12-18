import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from './menu/menu.component';
import { SharedService } from './services/shared-service';
import { UsersService } from './login/services/users.service';
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    PlayerComponent,
    TableComponent,
    LoginComponent,
    MenuComponent,
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
  ],
  providers: [
    PlayerComponent,
    CardsComponent,
    TableComponent,
    MenuComponent,
    SharedService,
    UsersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
