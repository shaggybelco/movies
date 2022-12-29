import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from '../Models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<Movies> {
    return this.http.get<Movies>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMoviesDetails(id: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}