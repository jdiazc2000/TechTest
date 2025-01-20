import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { PokemonlistComponent } from './pokemonlist.component';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { LoaderService } from '../../services/loader/loader.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../../components/card/card.component';
import { NotespecialcharacterDirective } from '../../core/directives/notespecialcharacter.directive';
import { CommonModule } from '@angular/common';

describe('PokemonlistComponent', () => {
  let component: PokemonlistComponent;
  let fixture: ComponentFixture<PokemonlistComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemons']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['showLoading', 'closeLoading', 'showLoadingError']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, RouterTestingModule, FormsModule, PokemonlistComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonlistComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch pokemons on ngOnInit', fakeAsync(() => {
    const mockPokemons = [{ name: 'Pikachu', id: 1 }];
    pokemonService.getPokemons.and.returnValue(of(mockPokemons));
    userService.getUser.and.returnValue([{
      username: 'Ash',
      id: 0,
      name: '',
      town: '',
      password: '',
      admin: false,
      registrationDate: '',
      photo: ''
    }]);
    
    component.ngOnInit();
    tick();
    flush();
    fixture.detectChanges();

    expect(loaderService.showLoading).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalled();
    expect(pokemonService.getPokemons).toHaveBeenCalledWith(1302, 0);
    expect(component.allpokemons.length).toBe(0);
  }));

  it('should handle error when fetching pokemons', fakeAsync(() => {
    pokemonService.getPokemons.and.returnValue(throwError(() => new Error('API error')));
    component.ngOnInit();
    tick();

    expect(loaderService.showLoadingError).toHaveBeenCalledWith('list');
  }));

  it('should search pokemons by name or ID', () => {
    component.allpokemons = [
      { name: 'Pikachu', id: 1 },
      { name: 'Charmander', id: 4 }
    ];
    component.searchQuery = 'pikachu';
    component.onSearch();

    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('Pikachu');
  });


  it('should navigate to login on returnToLogin', () => {
    component.returnToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to users maintenance on GoUsers', () => {
    component.GoUsers();
    expect(router.navigate).toHaveBeenCalledWith(['/usersmaintenance']);
  });

});
