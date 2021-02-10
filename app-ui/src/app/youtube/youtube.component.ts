import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OmdbService } from '../api/omdb.service';
import { Video } from '../shared/model/search.interface';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  inputTouched = false;
  loading = false;
  videos: Video[] = [];
  constructor(
    private omdbService: OmdbService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.handleSearch(this.omdbService.name + 'movie trailer');
  }
  // tslint:disable-next-line:typedef
  handleSearch(inputValue: string) {
    this.loading = true;
    console.log(inputValue);
    this.omdbService.getVideos(inputValue)
      .subscribe((items: any) => {
        this.videos = items.map(item => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.id.videoId),
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
        this.inputTouched = true;
        this.loading = false;
        console.log(this.videos);

      });
  }

}
