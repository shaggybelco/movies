import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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

  getNowPlaying(page = 1): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&page=${page}`)
  }

  getVideos(id: any): Observable<any>{
    return this.http.get(`${environment.baseUrl}/movie/${id}/videos?api_key=${environment.apiKey}`)
  }

  getUpcoming(page = 1): Observable<any>{ 
    return this.http.get(`${environment.baseUrl}/movie/upcoming?api_key=${environment.apiKey}&page=${page}`)
  }

  getTopMovies(page=1): Observable<any>{
    return this.http.get(
      `${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`
    );
  }
}
