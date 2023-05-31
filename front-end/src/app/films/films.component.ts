import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  movies: any;
    constructor(private http: HttpClient) { }

    getImage = (movieName: string) => movieName.replace(/\*| |:|%|#|&|\$/g,'');
    
    ngOnInit() {
        this.http.get('http://localhost:3000/films').subscribe({next:(data:any) => this.movies = data}); // console.log(data)
    }
}
