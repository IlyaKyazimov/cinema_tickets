import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {

  cinemasData: any;
  cinemasNames: any;
  movieName: string;
  seanceDate: string;
  checkedCinemas: string[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 

    this.movieName = route.snapshot.params['movieName'];
    this.seanceDate = route.snapshot.params['seanceDate'];
  }

  formatTitle = (title: string) => title?.replace(/\*| |:|%|#|&|\$/g,'');

  formatSeanceTime = (time: string) => time.slice(0, -3);

  getCheckedCinemas(value: string) {
    if (this.checkedCinemas.includes(value)) {
      this.checkedCinemas = this.checkedCinemas.filter((item) => item !== value);
    } else {
      this.checkedCinemas.push(value);
    }
  }

  trackByIdentifier(index: number, item: any): number { return item.id }

  applyFilter() { this.ngOnInit() }

  cancelFilter() { window.location.reload() }

  ngOnInit() {

    this.router.navigate([this.movieName, this.seanceDate, 'seances'], {
      queryParams: {
        cinemaName: this.checkedCinemas
      }
    })
      .then(() => {
        const queryParams = this.route.snapshot.queryParams;
        const routeWithParams = this.router.createUrlTree([], { queryParams }).toString();

        this.http.get('http://localhost:3000' + routeWithParams).subscribe({
          next: (data: any) => { 
            this.cinemasData  = data[0];
            this.cinemasNames = data[1];
           }
        });
      })
  }
}
