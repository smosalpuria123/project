import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OmdbService } from '../api/omdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  movieTitle: string;
  trend: string;
  searchMovieSub: Subscription;
  myImages = 'assets/images/movielogo.png';
  constructor(
    private omdbService: OmdbService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trendMovies();
  }

  onSearch(): void{
    this.omdbService.movieTitle = this.movieTitle;
    this.router.navigate(['/search']);
  }
  ngOnDestroy(): void {
    this.searchMovieSub.unsubscribe();
  }
  trendMovies(): void{
    this.searchMovieSub = this.omdbService.findMovie().subscribe(
      res => this.searchSuccess(res),
      err => this.searchError(err)
    );
  }
  searchSuccess(res): void{
    this.trend = res.results;
    console.log(this.trend);
  }
  searchError(err): void{
    console.log(err);
  }

  onmovie(movieId: string): void{
    console.log('found');
    this.omdbService.Id = movieId;
    console.log(movieId);
    this.router.navigate(['/movie/:imdbId']);
  }
}
