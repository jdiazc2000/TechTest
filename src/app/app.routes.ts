import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PokemonlistComponent } from './pages/pokemonlist/pokemonlist.component';
import { PokemondetailComponent } from './pages/pokemondetail/pokemondetail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UsersmaintenanceComponent } from './pages/usersmaintenance/usersmaintenance.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: PokemonlistComponent, canActivate: [authGuard] },
  { path: 'pokemon/:name', component: PokemondetailComponent, canActivate: [authGuard] },
  { path: 'usersmaintenance', component: UsersmaintenanceComponent, canActivate: [adminGuard] },
  { path: '**', component: NotfoundComponent }
];