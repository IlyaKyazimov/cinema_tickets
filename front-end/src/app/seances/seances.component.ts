import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {

  cinemasData: any;
  movieName: string;
  seanceDate: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) { 

    this.movieName = activateRoute.snapshot.params['movieName'];
    this.seanceDate = activateRoute.snapshot.params['seanceDate'];
  }

  getImage = () => this.movieName?.replace(/\*| |:|%|#|&|\$/g,'');

  formatSeanceTime = (time: string) => time.slice(0, -3);

  ngOnInit() {
    this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/seances').subscribe({ next: (data: any) => this.cinemasData = data }); // console.log(data)
  }
}
