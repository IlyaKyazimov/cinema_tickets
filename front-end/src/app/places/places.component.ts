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
  placesInfo: any;
  movieName: string;
  seanceDate: string;
  seanceCinema: string;
  cinemaAddress!: string;
  reservedAmount: number = 0;
  price!: number;
  totalSum!: number;
  seanceTime: string;

  receivedData: any;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) {

    this.movieName = activateRoute.snapshot.params['movieName'];
    this.seanceDate = activateRoute.snapshot.params['seanceDate'];
    this.seanceCinema = activateRoute.snapshot.params['seanceCinema'];
    this.seanceTime = activateRoute.snapshot.params['seanceTime'];
  }

  formatTitle = (title: string) => title?.replace(/\*| |:|%|#|&|\$/g, '');

  formatSeanceTime = (time: string) => time.slice(0, -3);

  getPrice(seat: any) {
    const status = seat.status == 'Free' ? 'Reserved' : 'Free';

    if (status == 'Free') {
      this.reservedAmount--;
      this.placesInfo.busy--;
      this.placesInfo.free++;
    } else {
      this.reservedAmount++;
      this.placesInfo.busy++;
      this.placesInfo.free--;
    }

    this.totalSum = this.reservedAmount * this.price;

    this.postPlace(seat, status, this.placesInfo).subscribe({
      next: (data: any) => { this.receivedData = data; },
      error: error => console.log(error)
    });

    seat.status = status;
  }

  postPlace(seat: any, status: string, placesInfo: any) {

    const body = { seatId: seat.id, seatStatus: status, placesInfoId: placesInfo.id, placesInfoFree: placesInfo.free, placesInfoBusy: placesInfo.busy };
    return this.http.post('http://localhost:3000/' + this.movieName + '/' +
      this.seanceDate + '/' + this.seanceCinema + '/' + this.seanceTime + '/places', body);
  }

  ngOnInit() {

    this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/' +
      this.seanceCinema + '/' + this.seanceTime + '/places').subscribe({
        next: (data: any) => {

          this.seatsRows = data[0].places.reduce(function (arr: { [x: string]: any[]; }, obj: { line: string | number; }) {
            arr[obj.line] = arr[obj.line] || [];
            arr[obj.line].push(obj);
            return arr;
          }, []);

          this.seatsRows = this.seatsRows.slice(1);

          for (let seatsRow of this.seatsRows) {
            for (let seat of seatsRow) {
              if (seat.status == 'Reserved') this.reservedAmount++;
            }
          }

          this.placesInfo = { id: data[0].id, free: data[0].free, busy: data[0].busy };
          this.cinemaAddress = data[0].seance.cinema.address;
          this.price = data[0].seance.price;

          this.reservedAmount > 0 ? this.totalSum = this.price * this.reservedAmount : this.totalSum = 0;

          return;
        }
      });
  }
}
