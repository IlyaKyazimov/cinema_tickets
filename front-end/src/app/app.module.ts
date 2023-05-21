import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  { path: ':movieName/seances', component: SeancesComponent},
  { path: ':movieName/:seanceCinema/:seanceDate/places', component: PlacesComponent},
  { path: 'cart', component: CartComponent},
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
