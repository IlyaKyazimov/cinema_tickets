import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  date: any;
  movies: any;

  constructor(private http: HttpClient) { }

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

  ngOnInit() {
    this.http.get('http://localhost:3000/films').subscribe({
      next: (data: any) => {
        this.movies = data;
        this.date = new Date().toLocaleString("default", { year: "numeric" }) + "-" +
         new Date().toLocaleString("default", { month: "2-digit" }) + "-" + 
         new Date().toLocaleString("default", { day: "2-digit" });
      }
    });
  }
}
