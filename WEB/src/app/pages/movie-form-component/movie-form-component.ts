import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movieService';

@Component({
  selector: 'app-movie-form-component',
  imports: [FormsModule],
  templateUrl: './movie-form-component.html',
  styleUrl: './movie-form-component.css',
})
export class MovieFormComponent {
  newFilm: Movie = {
    _id: '',
    title: '',
    year: 0,
    genre: '',
    rating: 0,
    platform: '',
    imageUrl: '',
    watched: false,
  };

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
  ) {}

  async onSubmit() {
    try {

      const resultado = await this.movieService.createMovie(this.newFilm);

      alert('Pelicula publicada con éxito!');

      this.newFilm = {
        _id: '',
        title: '',
        year: 0,
        genre: '',
        rating: 0,
        platform: '',
        imageUrl: '',
        watched: false,
      };

      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error al crear la pelicula:', error);
      alert('Hubo un error al publicar la pelicula');
    }
  }
}
