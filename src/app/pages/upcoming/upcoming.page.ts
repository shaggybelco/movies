import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  constructor(private movies: MoviesService) { }

  imgbaseUrl = environment.images;
  upcoming: any = [];
  
  currentPage = 1;
  ngOnInit() {
   this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent){
    this.movies.getUpcoming(this.currentPage).subscribe(
      {
        next: (res: any)=>{
          console.log(res.results)
          this.upcoming.push(...res.results)
          event?.target.complete();
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

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadMovies();
      event.target.complete();
    }, 2000);
  };
}
