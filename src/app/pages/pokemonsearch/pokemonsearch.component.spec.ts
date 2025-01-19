import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsearchComponent } from './pokemonsearch.component';

describe('PokemonsearchComponent', () => {
  let component: PokemonsearchComponent;
  let fixture: ComponentFixture<PokemonsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
