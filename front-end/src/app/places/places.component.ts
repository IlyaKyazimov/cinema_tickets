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
  seanceId: any;
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

    this.updatePlace(seat, status, this.placesInfo).subscribe({
      next: (data: any) => { this.receivedData = data; },
      error: error => console.log(error)
    });

    let addToCartBtn = document.getElementById('addToCart');
    this.reservedAmount > 0 ? addToCartBtn?.removeAttribute('disabled') : addToCartBtn?.setAttribute('disabled', 'true');

    seat.status = status;
  }

  updatePlace(seat: any, status: string, placesInfo: any) {

    const body = {
      seatId: seat.id, seatStatus: status, placesInfoId: placesInfo.id,
      placesInfoFree: placesInfo.free, placesInfoBusy: placesInfo.busy
    };

    return this.http.put('http://localhost:3000/' + this.movieName + '/' +
      this.seanceDate + '/' + this.seanceCinema + '/' + this.seanceTime + '/places', body);
  }

  cancelOrder() {

    this.placesInfo.busy -= this.reservedAmount;
    this.placesInfo.free += this.reservedAmount;
    this.reservedAmount = this.totalSum = 0;

    this.updateAllPlaces(this.placesInfo, this.seanceId).subscribe({
      next: (data: any) => { this.receivedData = data; },
      error: error => console.log(error)
    });

    window.location.reload();
  }

  updateAllPlaces(placesInfo: any, seanceId: any) {

    const body = { seanceId: seanceId, placesInfoId: placesInfo.id, placesInfoFree: placesInfo.free, placesInfoBusy: placesInfo.busy };

    return this.http.post('http://localhost:3000/' + this.movieName + '/' +
      this.seanceDate + '/' + this.seanceCinema + '/' + this.seanceTime + '/places', body);
  }

  addToCart() {

    this.createTickets(this.seatsRows, this.seanceId, this.price).subscribe({
      next: (data: any) => { this.receivedData = data; },
      error: error => console.log(error)
    });
  }

  createTickets(seatsRows: any, seanceId: number, price: number) {

    const body = { seatsRows: seatsRows, seanceId: seanceId, ticketPrice: price };
    return this.http.post('http://localhost:3000/cart', body);
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
          this.seanceId = data[0].seance.id;
          this.cinemaAddress = data[0].seance.cinema.address;
          this.price = data[0].seance.price;

          this.reservedAmount > 0 ? this.totalSum = this.price * this.reservedAmount : this.totalSum = 0;

          let addToCartBtn = document.getElementById('addToCart');
          this.reservedAmount > 0 ? addToCartBtn?.removeAttribute('disabled') : addToCartBtn?.setAttribute('disabled', 'true');

          return;
        }
      });
  }
}
