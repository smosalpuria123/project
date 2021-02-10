import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  movieTitle: string;
  Id: string;
  name: string;
  imdbId: string;
  movieId: [];
  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyCDIETCHfH52wyG7WteWYpAYq6MewfVMdE';

  getVideos(query: string): Observable <any> {
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  }

  youTube(): Observable<any> {
    console.log(this.movieId);
    const url = 'https://www.youtube.com/embed/' + this.movieId;
    return this.http.get(url);
  }
  searchMovies(): Observable<any> {
    if (this.movieTitle === undefined || this.movieTitle === null) { this.movieTitle = ''; }
    const url = 'http://localhost:3000/omdb/search?title=' + this.movieTitle;
    return this.http.get(url);
  }
  searchMoviesId(): Observable<any> {
    console.log(this.Id);
    if (this.Id === undefined || this.Id === null) { this.Id = ''; }
    const url = 'http://localhost:3000/omdb/result/' + this.Id;
    return this.http.get(url);
  }
  findMovie(): Observable<any> {
    const url = 'http://localhost:3000/omdb/find';
    return this.http.get(url);
  }
}
