import { ChangeDetectorRef, Component } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movieService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list-component',
  imports: [RouterLink],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css',
})
export class MovieListComponent {
  moviesList: Movie[] = [];
  filteredList: Movie[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private movieService: MovieService,
  ) {}

  async ngOnInit() {
    this.moviesList = await this.movieService.getMovies();
    this.filteredList = this.moviesList;
    console.log(this.filteredList);
    this.cdr.markForCheck();
  }

  movieFilter(searchTerm: string) {
    if (searchTerm === '') {
      this.filteredList = this.moviesList;
    } else {
      this.filteredList = this.moviesList.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
  }
}
