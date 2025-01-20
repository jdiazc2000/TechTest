import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemondetailComponent } from './pokemondetail.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('PokemondetailComponent', () => {
  let component: PokemondetailComponent;
  let fixture: ComponentFixture<PokemondetailComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: new BehaviorSubject({ name: 'pikachu' })
    };

    await TestBed.configureTestingModule({
      imports: [PokemondetailComponent],
      providers: [
        Apollo,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
