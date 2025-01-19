import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemontypelistComponent } from './pokemontypelist.component';

describe('PokemontypelistComponent', () => {
  let component: PokemontypelistComponent;
  let fixture: ComponentFixture<PokemontypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemontypelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemontypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
