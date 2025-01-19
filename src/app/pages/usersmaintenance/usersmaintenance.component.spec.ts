import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmaintenanceComponent } from './usersmaintenance.component';

describe('UsersmaintenanceComponent', () => {
  let component: UsersmaintenanceComponent;
  let fixture: ComponentFixture<UsersmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersmaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
