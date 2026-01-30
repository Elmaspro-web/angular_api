import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies';

  async getMovies(): Promise<Movie[]> {
    const res = await fetch(this.apiUrl);

    return res.json();
  }

  async getMovieById(id: string): Promise<Movie> {
    const res = await fetch(`${this.apiUrl}/${id}`);

    return res.json();
  }

  async createMovie(movie: Movie): Promise<Movie> {
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

    return res.json();
  }

  async updateMovie(id: string, movie: Movie): Promise<Movie> {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    return res.json();
  }

  async deleteMovie(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}
