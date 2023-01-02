import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Movies } from 'src/app/Models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.page.html',
  styleUrls: ['./nowplaying.page.scss'],
})
export class NowplayingPage implements OnInit {
  constructor(private movies: MoviesService) {}

  ngOnInit() {
    this.loadMovies();
  }

  currentPage = 1;
  npMv: any= [];
  imgbaseUrl = environment.images;

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movies.getNowPlaying(this.currentPage).subscribe({
      next: (res: Movies) => {
        this.npMv.push(...res.results);

        event?.target.complete();
        console.log(res.results);
      },
    });
  }

  getVideos(id: any){
    this.movies.getVideos(id).subscribe(
      {
        next: (res: any)=>{
          console.log(res)
        }
      }
    )
  }

  onIonInfinite(event: any) {
    this.currentPage++;
    this.loadMovies(event);
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
}
