import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: "artists",
    component: ArtistsComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];
