import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';


const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        url
        name
        image
        id
      }
    }
  }
  `;

  const GET_POKEMON = gql`
  query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
    stats {
      base_stat
      stat {
        name
      }
    }
  }
}
  `;

  const GET_POKEMON_EVOLUTIVE_LINE = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      params
      status
      message
      response
    }
  }
  `;
  

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private apollo: Apollo) {}
  
  getPokemons(limit: number, offset: number): Observable<any[]> {
    return this.apollo.watchQuery({
      query: GET_POKEMONS,
      variables: { limit, offset }
    }).valueChanges.pipe(
      map((result: any) => {
        return result?.data || [];
      })
    );
  }

  getPokemon(name: string): Observable<any[]> {
    return this.apollo.watchQuery({
      query: GET_POKEMON,
      variables: { name }
    }).valueChanges.pipe(
      map((result: any) => {
        return result?.data || [];
      })
    );
  }

  getPokemonEvolutionLine(id: string): Observable<any[]> {
    return this.apollo.watchQuery({
      query: GET_POKEMON_EVOLUTIVE_LINE,
      variables: { id }
    }).valueChanges.pipe(
      map((result: any) => {
        return result?.data || [];
      })
    );
  }
    
}
