import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orders: any;
  totalSum: number = 0;
  receivedData: any;

  constructor(private http: HttpClient, private router: Router) { }

  formatSeanceTime = (time: string) => time.slice(0, -3);

  payOrders() {

    this.totalSum = 0;

    for (let order of this.orders) {
      this.payAllPlaces(order.seance.placesInfo, order.seanceId).subscribe({
        next: (data: any) => { this.receivedData = data; },
        error: error => console.log(error)
      });
    }

    this.router.navigate(['/cart'])
      .then(() => {
        this.http.get('https://cinematickets-production.up.railway.app/api/cart').subscribe({
          next: (data: any) => { this.orders = data }
        });
      })

    alert('Your orders were paid successfully!');
  }

  payAllPlaces(placesInfo: any, seanceId: number) {

    const body = {
      seanceId: seanceId,
      placesInfoId: placesInfo.id
    };

    return this.http.patch('https://cinematickets-production.up.railway.app/api/cart', body);
  }

  cancelOrders() {

    this.totalSum = 0;

    for (let order of this.orders) {

      let reservedAmount = 0;

      for (let place of order.seance.placesInfo.places) {
        if (place.status == 'Reserved') reservedAmount++;
      }

      this.freeAllPlaces(order.seance.placesInfo, order.seanceId, reservedAmount).subscribe({
        next: (data: any) => { this.receivedData = data; },
        error: error => console.log(error)
      });
    }

    this.router.navigate(['/cart'])
      .then(() => {
        this.http.get('https://cinematickets-production.up.railway.app/api/cart').subscribe({
          next: (data: any) => {
            this.orders = data;

            for (let order of this.orders) {
              for (let sale of order.sales) {
                this.totalSum += sale.price;
              }
            }
          }
        });
      })
  }

  freeAllPlaces(placesInfo: any, seanceId: number, reservedAmount: number) {

    const body = {
      seanceId: seanceId, placesInfoId: placesInfo.id,
      placesInfoFree: placesInfo.free + reservedAmount,
      placesInfoBusy: placesInfo.busy - reservedAmount
    };

    return this.http.put('https://cinematickets-production.up.railway.app/api/cart', body);
  }

  cancelOrder(order: any) {

    let reservedAmount = 0;
    for (let place of order.seance.placesInfo.places) {
      if (place.status == 'Reserved') reservedAmount++;
    }

    this.freeAllPlaces(order.seance.placesInfo, order.seanceId, reservedAmount).subscribe({
      next: (data: any) => { this.receivedData = data; },
      error: error => console.log(error)
    });

    window.location.reload();
  }

  ngOnInit() {

    this.http.get('https://cinematickets-production.up.railway.app/api/cart').subscribe({
      next: (data: any) => {

        this.orders = data;

        for (let order of this.orders) {
          for (let sale of order.sales) {
            this.totalSum += sale.price;
          }
        }

      }
    });
  }
}
