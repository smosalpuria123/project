import { OmdbService } from './../api/omdb.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from 'youtube-sr';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieTitle: string;
  movies;
  array;
  imag;
  Id: string;
  searchMovieSub: Subscription;
  findMovieSub: Subscription;
  constructor(
    private router: Router,
    private omdbService: OmdbService,
  ) { }

  ngOnInit(): void {
    this.movieTitle = this.omdbService.movieTitle;
    this.Id = this.omdbService.Id;
    this.searchMoviesId();
  }
  ngOnDestroy(): void {
    this.searchMovieSub.unsubscribe();
  }

  info(s: string): void{
    console.log(s);
    this.omdbService.imdbId = s;
  }
  searchMoviesId(): void{
    this.searchMovieSub = this.omdbService.searchMoviesId().subscribe(
      res => this.searchSuccess(res),
      err => this.searchError(err)
    );
  }
  searchSuccess(res): void{
    this.movies = res;
    console.log('got it');
    console.log(this.movies);
  }
  searchError(err): void{
    console.log(err);
  }

  onYoutube(): void{
    this.router.navigate(['/youtubeResult']);
  }

  /*findMoviesId(): void{
    this.findMovieSub = this.omdbService.findMovie().subscribe(
      res => this.findSuccess(res),
      err => this.findError(err)
    );
  }
  findSuccess(res): void{
    this.array = res;
    console.log('got it');
    console.log(this.array);
  }
  findError(err): void{
    console.log(err);
  }
  */

}
