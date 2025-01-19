import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemonlist',
  standalone: true,
  imports: [CapitalizePipe, CommonModule, MatCardModule, RouterModule, FormsModule],
  templateUrl: './pokemonlist.component.html',
  styleUrl: './pokemonlist.component.scss'
})
export class PokemonlistComponent {
  pokemons: any[] = [];
  allpokemons: any[] = [];
  filteredPokemons: any[] = [];
  displayedPokemons: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  filtered: boolean = false;
  
  limit = 15;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.loading = true;
    try {
      const alldata: any = await firstValueFrom(this.pokemonService.getPokemons(1302, 0));
      this.allpokemons = alldata.pokemons.results || [];
      
      await this.fetchPaginatedPokemons();
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
    }
    this.loading = false;
  }

  async fetchPaginatedPokemons(): Promise<void> {
    this.loading = true;
    try {
      if (this.filtered) {
        this.displayedPokemons = this.filteredPokemons.slice(this.offset, this.offset + this.limit);
      } else {
        const data: any = await firstValueFrom(this.pokemonService.getPokemons(this.limit, this.offset));
        this.pokemons = data.pokemons.results || [];
        this.displayedPokemons = this.pokemons;
      }
    } catch (error) {
      console.error("Error fetching paginated Pokémons:", error);
    }
    this.loading = false;
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
}
