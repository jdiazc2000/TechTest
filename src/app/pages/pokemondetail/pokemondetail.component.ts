import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { POKEMON_TYPE_TRANSLATIONS } from '../../core/consts/POKEMON_TYPE_TRANSLATIONS'
import { POKEMON_TYPE_COLORS } from '../../core/consts/POKEMON_TYPE_COLORS'
import { POKEMON_STATS_TRANSLATIONS } from '../../core/consts/POKEMON_STATS_TRANSLATIONS'
import { CapitalizePipe } from "../../pipes/capitalize.pipe";

@Component({
  selector: 'app-pokemondetail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, CapitalizePipe],
  templateUrl: './pokemondetail.component.html',
  styleUrl: './pokemondetail.component.scss',
})

export class PokemondetailComponent {
  pokemon: any = [];
  pokemonname: string = "";
  loading: boolean = true;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {
    this.pokemonname = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    console.log(this.pokemonname)
    this.fetchPokemon();
  }

  async fetchPokemon(): Promise<void> {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.pokemonService.getPokemon(this.pokemonname));
      this.pokemon = data?.pokemon ? data : [];  
      console.log(this.pokemon)
      this.loading = false;
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
      this.loading = false;
    }
  }
  
  getPokemonType(type: string): string {
    return POKEMON_TYPE_TRANSLATIONS[type] || type; 
  }

  getPokemonStat(type: string): string {
    return POKEMON_STATS_TRANSLATIONS[type] || type; 
  }

  getPokemonTypeStyle(type: string): { color: string; background: string } {
    const typeColors = POKEMON_TYPE_COLORS[type] || { text: "#000", background: "#ddd" };
    return { color: typeColors.text, background: typeColors.background };
  }
}
