import { Component, OnInit, Optional } from '@angular/core';
import { App } from '@capacitor/app';
import { InfiniteScrollCustomEvent, IonRouterOutlet, LoadingController, Platform } from '@ionic/angular';
import { Movies } from 'src/app/Models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  constructor(
    private movies: MoviesService,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    @Optional() private routerOutlet: IonRouterOutlet,
  ) {

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });


  }

  movie: any = [];
  currentPage = 1;
  imgbaseUrl = environment.images;

  menu = ['Recommendations', 'Now playing', 'Top-rated'];

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });
    (await loading).present;

    this.movies.getTopRatedMovies(this.currentPage).subscribe({
      next: async (res: Movies) => {
        (await loading).dismiss();
        // this.movie = [...this.movie, ...res.results];
        this.movie.push(...res.results);

        event?.target.complete();
      },
    });
  }

  ngOnInit() {
    this.loadMovies();
  }

  onIonInfinite(event: any) {
    this.currentPage++;
    this.loadMovies(event);
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadMovies();
      event.target.complete();
    }, 2000);
  };
}
