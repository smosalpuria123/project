import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OmdbService } from '../api/omdb.service';
import { Subscription } from 'rxjs';
import { Video } from 'youtube-sr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private omdbService: OmdbService
  ) { }

  movies = [];
  Id: string;
  movieTitle: string;

  searchMovieSub: Subscription;

  ngOnInit(): void {
    this.movieTitle = this.omdbService.movieTitle;
    this.searchMovies();
  }

  ngOnDestroy(): void {
    this.searchMovieSub.unsubscribe();
  }

  searchMovies(): void{
    this.searchMovieSub = this.omdbService.searchMovies().subscribe(
      res => this.searchSuccess(res),
      err => this.searchError(err)
    );
  }
  searchSuccess(res): void{
    this.movies = res.results;
    console.log(this.movies);
  }
  searchError(err): void{
    console.log(err);
  }

  onSearch(): void{
    this.omdbService.movieTitle = this.movieTitle;
    this.searchMovies();
  }
  // tslint:disable-next-line:typedef

  onMovie(movieId: string, movieName: string): void{
    console.log('found');
    this.omdbService.Id = movieId;
    this.omdbService.name = movieName;
    console.log(movieId);
    this.router.navigate(['/movie/:imdbId']);
  }

}
