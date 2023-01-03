import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.page.html',
  styleUrls: ['./trailer.page.scss'],
})
export class TrailerPage implements OnInit {
  constructor(private route: ActivatedRoute, private movies: MoviesService) {}

  id = this.route.snapshot.paramMap.get('id');
  name = this.route.snapshot.paramMap.get('name');

  public trailer$ = this.movies.getVideos(this.id);

  vid: any = [];
  video: any;
  imgbaseUrl = environment.images;

  public movie$: Observable<any> = this.movies.getMoviesDetails(this.id);

  official= 'Official Trailer';
  hold: any = []

  ngOnInit(): void {
      this.loadMovies();
  }

  loadMovies(){
    this.trailer$.subscribe((res: any) => {
      this.vid = res.results;
      this.vid.forEach((element: any) => {
        console.log(element)
        if(element.name.toLowerCase() === 'official trailer'){
          this.video = element
          this.official = 'Official Trailer'
        }

        this.hold = element;
      });
    });

    if(!this.video){
      this.video = this.hold;
      this.official = 'This is not an offical trailer'
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadMovies();
      event.target.complete();
    }, 2000);
  };

}
