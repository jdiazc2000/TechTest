import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/loader/loader.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockUserService = {
    getUserByUsernameAndPassword: jasmine.createSpy('getUserByUsernameAndPassword').and.returnValue(undefined)
  };
  let mockLoaderService = {
    showLoginError: jasmine.createSpy('showLoginError')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: UserService, useValue: mockUserService },
        { provide: LoaderService, useValue: mockLoaderService },
        Apollo
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate the form when username and password are filled', () => {
    component.loginForm.setValue({ username: 'ash_ketchum', password: 'pikachu123' });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call userService on valid form submission', () => {
    component.loginForm.setValue({ username: 'ash_ketchum', password: 'pikachu123' });
    component.onSubmit();
    expect(mockUserService.getUserByUsernameAndPassword).toHaveBeenCalledWith('ash_ketchum', 'pikachu123');
  });

  it('should navigate to /list if user is found', () => {
    mockUserService.getUserByUsernameAndPassword.and.returnValue({ username: 'ash_ketchum', password: 'pikachu123' });
    component.loginForm.setValue({ username: 'ash_ketchum', password: 'pikachu123' });
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should show login error if user is not found', () => {
    component.loginForm.setValue({ username: 'wrong_user', password: 'wrong_password' });
    component.onSubmit();
    expect(mockLoaderService.showLoginError).toHaveBeenCalledWith('login');
  });
});
