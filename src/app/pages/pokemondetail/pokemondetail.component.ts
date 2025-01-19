import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemondetail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './pokemondetail.component.html',
  styleUrl: './pokemondetail.component.scss'
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
}
