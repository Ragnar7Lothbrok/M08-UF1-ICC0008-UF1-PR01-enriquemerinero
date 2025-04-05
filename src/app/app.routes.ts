import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  /*
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  */
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'jugadores',
    loadComponent: () => import('./pages/jugadores/jugadores.page').then( m => m.JugadoresPage)
  },
  {
    path: 'jugador-detalle',
    loadComponent: () => import('./pages/jugador-detalle/jugador-detalle.page').then( m => m.JugadorDetallePage)
  },
];
