import { UserService } from './../../services/user/user.service';
import { LoaderService } from './../../services/loader/loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotespecialcharacterDirective } from '../../core/directives/notespecialcharacter.directive';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-pokemonlist',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, FormsModule, NotespecialcharacterDirective, CardComponent],
  templateUrl: './pokemonlist.component.html',
  styleUrl: './pokemonlist.component.scss'
})
export class PokemonlistComponent implements OnInit, OnDestroy {
  pokemons: any[] = [];
  allpokemons: any[] = [];
  filteredPokemons: any[] = [];
  displayedPokemons: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  filtered: boolean = false;

  user: any;
  
  limit = 15;
  offset = 0;
  
  constructor(private pokemonService: PokemonService, private loaderService: LoaderService, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    this.loaderService.showLoading();
    this.user = this.userService.getUser();
    try {
      const alldata: any = await firstValueFrom(this.pokemonService.getPokemons(1302, 0));
      this.allpokemons = alldata.pokemons.results || [];
      
      await this.fetchPaginatedPokemons();
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
      this.loaderService.showLoadingError('list');
    }
  }

  ngOnDestroy(): void {
    this.loaderService.closeLoading();
  }

  async fetchPaginatedPokemons(): Promise<void> {
    try {
      this.loaderService.showLoading();
        if (this.filtered) {
          this.displayedPokemons = this.filteredPokemons.slice(this.offset, this.offset + this.limit);
        } else {
          const data: any = await firstValueFrom(this.pokemonService.getPokemons(this.limit, this.offset));
          this.pokemons = data.pokemons.results || [];
          this.displayedPokemons = this.pokemons;
        }
      this.loaderService.closeLoading()
    } catch (error) {
      console.error("Error fetching paginated Pokémons:", error);
      this.loaderService.showLoadingError('list');
    }
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filtered = false;
      this.offset = 0;
      this.fetchPaginatedPokemons();
      return;
    }

    this.filteredPokemons = this.allpokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(query) || 
      pokemon.id.toString().includes(query)
    );

    this.filtered = true;
    this.offset = 0;
    this.fetchPaginatedPokemons();
  }

  async nextPage() {
    if (this.filtered) {
      if (this.offset + this.limit < this.filteredPokemons.length) {
        this.offset += this.limit;
        this.fetchPaginatedPokemons();
      }
    } else {
      if (this.offset + this.limit < this.allpokemons.length) {
        this.offset += this.limit;
        await this.fetchPaginatedPokemons();
      }
    }
  }

  async prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      await this.fetchPaginatedPokemons();
    }
  }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  GoUsers() {
    this.router.navigate(['/usersmaintenance']);
  }
}
