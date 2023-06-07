import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

import {Routes, RouterModule} from '@angular/router';

import { FilmsComponent } from './films/films.component';
import { SeancesComponent } from './seances/seances.component';
import { PlacesComponent } from './places/places.component';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  { path: 'films', component: FilmsComponent},
  { path: ':movieName/:seanceDate/seances', component: SeancesComponent},
  { path: ':movieName/:seanceDate/:seanceCinema/:seanceTime/places', component: PlacesComponent},
  { path: 'cart', component: CartComponent},
  { path: '**', redirectTo: "films"}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FilmsComponent,
    SeancesComponent,
    PlacesComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
