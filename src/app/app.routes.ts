import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PokemonlistComponent } from './pages/pokemonlist/pokemonlist.component';
import { PokemondetailComponent } from './pages/pokemondetail/pokemondetail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UsersmaintenanceComponent } from './pages/usersmaintenance/usersmaintenance.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: PokemonlistComponent },
  { path: 'pokemon/:name', component: PokemondetailComponent },
  { path: 'usersmaintenance', 
    component: UsersmaintenanceComponent, 
    canActivate: [authGuard], 
    children: [
      {path: 'list', component: UserListComponent},
      {path: 'add', component: UserFormComponent},
    ] 
  },
  { path: '**', component: NotfoundComponent }
  ];