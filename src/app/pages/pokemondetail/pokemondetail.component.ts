import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { POKEMON_TYPE_TRANSLATIONS } from '../../core/consts/POKEMON_TYPE_TRANSLATIONS'
import { POKEMON_TYPE_COLORS } from '../../core/consts/POKEMON_TYPE_COLORS'
import { POKEMON_STATS_TRANSLATIONS } from '../../core/consts/POKEMON_STATS_TRANSLATIONS'
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-pokemondetail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, CapitalizePipe],
  templateUrl: './pokemondetail.component.html',
  styleUrl: './pokemondetail.component.scss',
})

export class PokemondetailComponent implements OnInit {
  pokemon: any = [];
  pokemonname: string = "";
  loading: boolean = true;
  EvolutiveLine: any = [];

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private loaderService: LoaderService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonname = params['name'];
      this.pokemon = [];
      this.EvolutiveLine = [];
      this.fetchPokemon();
    });
  }

  async fetchPokemon(): Promise<void> {
    this.loaderService.showLoading();
    try {
      const data: any = await firstValueFrom(this.pokemonService.getPokemon(this.pokemonname));
      this.pokemon = data?.pokemon ? data : [];  
      
      const evoluationline: any = await firstValueFrom(this.pokemonService.getPokemonEvolutionLine(this.pokemon.pokemon.id.toString()));

      for(let i = 0; i < evoluationline.evolutionChain?.response?.chain?.evolves_to?.length; i++){
        this.PushPokemonToEvolutiveLine(evoluationline.evolutionChain?.response?.chain?.evolves_to[i]?.species?.name);

        for(let j = 0; j < evoluationline.evolutionChain?.response?.chain?.evolves_to[j]?.evolves_to?.length; j++){
          this.PushPokemonToEvolutiveLine(evoluationline.evolutionChain?.response?.chain?.evolves_to[i]?.evolves_to[j]?.species?.name);
        }
      }
      
      this.loaderService.closeLoading();
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
      this.loaderService.showLoadingError('detail');
    }
  }

  async PushPokemonToEvolutiveLine(pokemon: string): Promise<void> {
    try {
      this.loaderService.showLoading();
      const data: any = await firstValueFrom(this.pokemonService.getPokemon(pokemon));
      this.EvolutiveLine.push(data);  
      this.loaderService.closeLoading();
    } catch (error) {
      console.error("Error fetching Pokemon evolutive line:", error);
      this.loaderService.showLoadingError('detail');
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

  findPokemon(name: string) {
    this.router.navigate(['/pokemon',name]);
  }
}
