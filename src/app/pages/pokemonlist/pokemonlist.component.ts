import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemonlist',
  standalone: true,
  imports: [CapitalizePipe,CommonModule, MatCardModule, RouterModule],
  templateUrl: './pokemonlist.component.html',
  styleUrl: './pokemonlist.component.scss'
})
export class PokemonlistComponent {
  pokemons: any = [];
  loading: boolean = true;
  limit = 15;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  async fetchPokemons(): Promise<void> {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.pokemonService.getPokemons(this.limit, this.offset));
      this.pokemons = data.pokemons.results.length > 0 ? data : [];  
      this.loading = false;
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
      this.loading = false;
    }
  }
  
  nextPage() {
    this.offset += this.limit;
    this.fetchPokemons();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.fetchPokemons();
    }
  }
}
