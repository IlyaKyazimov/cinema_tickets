import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orders: any;
  totalSum: number = 0;
  receivedData: any;

  constructor(private http: HttpClient) { }

  formatSeanceTime = (time: string) => time.slice(0, -3);

  cancelOrder() {

    this.totalSum = 0;

    for (let order of this.orders) {

      let reservedAmount = 0;

      for(let place of order.seance.placesInfo.places) {
        if(place.status == 'Reserved') reservedAmount++;
      }
      
      this.updateAllPlaces(order.seance.placesInfo, order.seanceId, reservedAmount).subscribe({
        next: (data: any) => { this.receivedData = data; },
        error: error => console.log(error)
      });

    }
  }

  updateAllPlaces(placesInfo: any, seanceId: number, reservedAmount: number) {

    const body = { seanceId: seanceId, placesInfoId: placesInfo.id,
       placesInfoFree: placesInfo.free + reservedAmount,
        placesInfoBusy: placesInfo.busy - reservedAmount };

    return this.http.put('http://localhost:3000/cart', body);
  }

  ngOnInit() {

    this.http.get('http://localhost:3000/cart').subscribe({
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
