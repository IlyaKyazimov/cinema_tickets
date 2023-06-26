import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  date: any;
  dateTitle: any;
  today: any;
  tomorrow: any;
  movies: any;
  countries: any;
  genres: any;
  checkedGenres: string[] = [];
  checkedCountries: string[] = [];
  ageRating: any;
  isChecked: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.today = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
      new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date().toLocaleString("default", { day: "2-digit" });

    this.tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { year: "numeric" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { day: "2-digit" });
  }

  getTitle = (movieName: string) => movieName.replace(/\*| |:|%|#|&|\$/g, '');

  getDate() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedGenres = [];
    this.checkedCountries = [];

    this.router.navigate(['/films'])
      .then(() => {

        this.http.get('https://cinematickets-production.up.railway.app/api/films', { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })

    if (this.date == this.today) {
      this.dateTitle = 'Today';
    } else if (this.date == this.tomorrow) {
      this.dateTitle = 'Tomorrow';
    } else {
      this.dateTitle = 'On ' + this.date;
    }
  }

  getToday() {
    this.date = this.today;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedGenres = [];
    this.checkedCountries = [];

    this.router.navigate(['/films'])
      .then(() => {

        this.http.get('https://cinematickets-production.up.railway.app/api/films', { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })

    this.dateTitle = 'Today';
  }

  getTomorrow() {
    this.date = this.tomorrow;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedGenres = [];
    this.checkedCountries = [];

    this.router.navigate(['/films'])
      .then(() => {

        this.http.get('https://cinematickets-production.up.railway.app/api/films', { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })

    this.dateTitle = 'Tomorrow';
  }

  getCheckedGenres(value: string) {
    if (this.checkedGenres.includes(value)) {
      this.checkedGenres = this.checkedGenres.filter((item) => item !== value);
    } else {
      this.checkedGenres.push(value);
    }
  }

  getCheckedCountries(value: string) {
    if (this.checkedCountries.includes(value)) {
      this.checkedCountries = this.checkedCountries.filter((item) => item !== value);
    } else {
      this.checkedCountries.push(value);
    }
  }

  trackByIdentifier(index: number, item: any): number { return item.id }

  switchAgeRating() {
    let rangeValue = document.getElementById('range-value');

    if(this.isChecked && rangeValue) {
      this.ageRating = rangeValue.textContent?.slice(0, -1);
    } else {
      this.ageRating = null;
    }
  }

  applyFilter() {
    this.switchAgeRating();

    this.router.navigate(['/films'], {
      queryParams: {
        genre: this.checkedGenres,
        country: this.checkedCountries,
        ageRating: this.ageRating
      }
    })
      .then(() => {
        const queryParams = this.route.snapshot.queryParams;
        const routeWithParams = this.router.createUrlTree([], { queryParams }).toString();

        this.http.get('https://cinematickets-production.up.railway.app/api' + routeWithParams, { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })
  }

  cancelFilter() {
    this.isChecked = false;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    this.checkedGenres = [];
    this.checkedCountries = [];

    this.router.navigate(['/films'])
      .then(() => {

        this.http.get('https://cinematickets-production.up.railway.app/api/films', { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })

    if (this.date == this.today) {
      this.dateTitle = 'Today';
    } else if (this.date == this.tomorrow) {
      this.dateTitle = 'Tomorrow';
    } else {
      this.dateTitle = 'On ' + this.date;
    }
  }

  ngOnInit() {
    
    this.date = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
      new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date().toLocaleString("default", { day: "2-digit" });

    this.router.navigate(['/films'], {
      queryParams: {
        genre: this.checkedGenres,
        country: this.checkedCountries,
        ageRating: this.ageRating
      }
    })
      .then(() => {
        const queryParams = this.route.snapshot.queryParams;
        const routeWithParams = this.router.createUrlTree([], { queryParams }).toString();

        this.http.get('https://cinematickets-production.up.railway.app/api' + routeWithParams, { params: { date: this.date } }).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];
          }
        });
      })

    this.dateTitle = 'Today';
  }
}
