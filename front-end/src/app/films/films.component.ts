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
  movies: any;
  countries: any;
  genres: any;
  checkedGenres: string[] = [];
  checkedCountries: string[] = [];
  ageRating: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  getImage = (movieName: string) => movieName.replace(/\*| |:|%|#|&|\$/g, '');

  getToday() {
    this.date = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
      new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date().toLocaleString("default", { day: "2-digit" });
  }

  getTomorrow() {
    this.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { year: "numeric" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { month: "2-digit" }) + "-" +
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString("default", { day: "2-digit" });
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

  applyFilter() {
    let rangeValue = document.getElementById('range-value');
    if(rangeValue) this.ageRating = rangeValue.textContent?.slice(0, -1);
    
    this.ngOnInit();
  }

  cancelFilter() { window.location.reload() }

  ngOnInit() {

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

        this.http.get('http://localhost:3000' + routeWithParams).subscribe({
          next: (data: any) => {

            this.movies = data[0];
            this.countries = data[1];
            this.genres = data[2];

            this.date = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
              new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
              new Date().toLocaleString("default", { day: "2-digit" });
          }
        });
      })
  }
}
