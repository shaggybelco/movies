import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movies: MoviesService
  ) {}

  imgbaseUrl = environment.images;

  id = this.route.snapshot.paramMap.get('id');
  public movie$: Observable<any> = this.movies.getMoviesDetails(this.id);

  ngOnInit() {}

  openHome() {
    this.router.navigate(['/movies']);
  }
}
