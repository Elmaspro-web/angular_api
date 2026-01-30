import { ChangeDetectorRef, Component } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movieService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail-component',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.css',
})
export class MovieDetailComponent {
  movie: Movie | null = null;
  showEditForm = false;
  movieForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.movieForm = this.fb.group({
      title: [''],
      year: [0],
      genre: [''],
      rating: [0],
      platform: [''],
      imageUrl: [''],
      watched: [false],
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie = await this.movieService.getMovieById(id);
      this.movieForm.patchValue(this.movie);
    }
    this.cdr.markForCheck();
  }

  async deleteMovie(id: string) {
    await this.movieService.deleteMovie(id);
    this.router.navigate(['/movies']);
  }

  async editMovie(id: string, movie: Movie) {
    await this.movieService.updateMovie(id, movie);
    this.movie = await this.movieService.getMovieById(id);
    this.showEditForm = false;
    this.cdr.markForCheck();
  }
}
