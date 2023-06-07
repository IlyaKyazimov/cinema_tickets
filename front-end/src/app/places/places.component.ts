import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent {

  seatsRows: any;
  movieName: string;
  seanceDate: string;
  seanceCinema: string;
  cinemaAddress!: string;
  count: number = 0;
  price!: number;
  totalSum: number = 0;
  seanceTime: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) {

    this.movieName = activateRoute.snapshot.params['movieName'];
    this.seanceDate = activateRoute.snapshot.params['seanceDate'];
    this.seanceCinema = activateRoute.snapshot.params['seanceCinema'];
    this.seanceTime = activateRoute.snapshot.params['seanceTime'];
  }

  formatTitle = (title: string) => title?.replace(/\*| |:|%|#|&|\$/g, '');

  formatSeanceTime = (time: string) => time.slice(0, -3);

  getPrice() {
    this.count++;
    this.totalSum = this.count * this.price;
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/' + this.seanceCinema + '/' + this.seanceTime + '/places').subscribe({
      next: (data: any) => {

        this.seatsRows = data[0].places.reduce(function (arr: { [x: string]: any[]; }, obj: { line: string | number; }) {
          arr[obj.line] = arr[obj.line] || [];
          arr[obj.line].push(obj);
          return arr;
        }, []);

        this.seatsRows = this.seatsRows.slice(1);
        this.cinemaAddress = data[0].seance.cinema.address;
        this.price = data[0].seance.price;

        return;
      }
    }); // console.log(data)
  }
}
