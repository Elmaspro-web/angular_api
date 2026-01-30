import { Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail-component/movie-detail-component';
import { MovieFormComponent } from './pages/movie-form-component/movie-form-component';
import { MovieListComponent } from './pages/movie-list-component/movie-list-component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
];
