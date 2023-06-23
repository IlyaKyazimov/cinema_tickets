import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {

  cinemasData: any;
  description: any;
  cinemasNames: any;
  movieName: string;
  seanceDate: string;
  checkedCinemas: string[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer) {

    this.movieName = route.snapshot.params['movieName'];
    this.seanceDate = route.snapshot.params['seanceDate'];
  }

  createUrl(movieName: string, seanceDate: string, cinemaName: string, seanceTime: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(movieName + '/' + seanceDate + '/' +
      cinemaName + '/' + this.formatSeanceTime(seanceTime) + '/places');
  }

  formatTitle = (title: string) => title?.replace(/\*| |:|%|#|&|\$/g, '');

  getDate() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedCinemas = [];

    this.router.navigate([this.movieName, this.seanceDate, 'seances'])
      .then(() => {

        this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/seances').subscribe({
          next: (data: any) => {

            this.cinemasData = data[0];
            this.cinemasNames = data[1];
            this.description = this.cinemasData[0].seances[0].movie.description;
          }
        });
      })
  }

  getToday() {
    this.seanceDate = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
      new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date().toLocaleString("default", { day: "2-digit" });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedCinemas = [];

    this.router.navigate([this.movieName, this.seanceDate, 'seances'])
      .then(() => {

        this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/seances').subscribe({
          next: (data: any) => {

            this.cinemasData = data[0];
            this.cinemasNames = data[1];
            this.description = this.cinemasData[0].seances[0].movie.description;
          }
        });
      })
  }

  getTomorrow() {
    this.seanceDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { year: "numeric" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { day: "2-digit" });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedCinemas = [];

    this.router.navigate([this.movieName, this.seanceDate, 'seances'])
      .then(() => {

        this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/seances').subscribe({
          next: (data: any) => {

            this.cinemasData = data[0];
            this.cinemasNames = data[1];
            this.description = this.cinemasData[0].seances[0].movie.description;
          }
        });
      })
  }

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

  cancelFilter() {
    //window.location.reload()

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedCinemas = [];

    this.router.navigate([this.movieName, this.seanceDate, 'seances'])
      .then(() => {

        this.http.get('http://localhost:3000/' + this.movieName + '/' + this.seanceDate + '/seances').subscribe({
          next: (data: any) => {

            this.cinemasData = data[0];
            this.cinemasNames = data[1];
            this.description = this.cinemasData[0].seances[0].movie.description;
          }
        });
      })
  }

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
            this.cinemasData = data[0];
            this.cinemasNames = data[1];
            if (data[0].length > 0)
              this.description = this.cinemasData[0].seances[0].movie.description;
          }
        });
      })
  }
}
