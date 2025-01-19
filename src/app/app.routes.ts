import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PokemonlistComponent } from './pages/pokemonlist/pokemonlist.component';
import { PokemondetailComponent } from './pages/pokemondetail/pokemondetail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: PokemonlistComponent },
  { path: 'pokemon/:name', component: PokemondetailComponent },
  { path: 'dashboard', component: PokemonlistComponent, canActivate: [authGuard] },
  { path: '**', component: NotfoundComponent }
  ];