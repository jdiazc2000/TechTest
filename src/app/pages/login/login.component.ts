import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { User } from '../../core/models/User';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/loader/loader.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;
  users: User[] = [
      {
        id: 1,
        name: 'Ash Ketchum',
        username: 'ash_ketchum',
        password: 'pikachu123',
        admin: true,
        town: 'Pueblo Paleta',
        registrationDate: '2024-01-10',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
      },
      {
        id: 2,
        name: 'Misty',
        username: 'misty_water',
        password: 'goldeen456',
        admin: false,
        town: 'Ciudad Celeste',
        registrationDate: '2024-02-15',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png'
      },
      {
        id: 3,
        name: 'Brock',
        username: 'brock_rock',
        password: 'onix789',
        admin: false,
        town: 'Ciudad Plateada',
        registrationDate: '2024-03-20',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png'
      },
      {
        id: 4,
        name: 'Gary Oak',
        username: 'gary_oak',
        password: 'eevee321',
        admin: false,
        town: 'Pueblo Paleta',
        registrationDate: '2024-04-05',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
      },
      {
        id: 5,
        name: 'Tracey Sketchit',
        username: 'tracey_sketch',
        password: 'smeargle654',
        admin: false,
        town: 'Islas Naranja',
        registrationDate: '2024-05-12',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/235.png'
      },
      {
        id: 6,
        name: 'May',
        username: 'may_fire',
        password: 'torchic852',
        admin: false,
        town: 'Ciudad Petalia',
        registrationDate: '2024-06-18',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png'
      },
      {
        id: 7,
        name: 'Dawn',
        username: 'dawn_water',
        password: 'piplup741',
        admin: false,
        town: 'Pueblo Hojasgemelas',
        registrationDate: '2024-07-22',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png'
      },
      {
        id: 8,
        name: 'Serena',
        username: 'serena_wind',
        password: 'froakie963',
        admin: false,
        town: 'Ciudad Vaniville',
        registrationDate: '2024-08-30',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png'
      },
      {
        id: 9,
        name: 'Lillie',
        username: 'lillie_light',
        password: 'porygon852',
        admin: false,
        town: 'Ciudad Hauoli',
        registrationDate: '2024-09-05',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png'
      },
      {
        id: 10,
        name: 'Gladion',
        username: 'gladion_dark',
        password: 'zoroark159',
        admin: false,
        town: 'Ciudad Malie',
        registrationDate: '2024-10-10',
        photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png'
      }
  ];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private loaderService: LoaderService) {

    if (!sessionStorage.getItem('users') || sessionStorage.getItem('users') === '[]') {
      sessionStorage.setItem('users', JSON.stringify(this.users));
    }
    sessionStorage.removeItem('user');
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username.trim();
      const password = this.loginForm.value.password.trim();
      const user = this.userService.getUserByUsernameAndPassword(username, password)
      console.log(user)
      if(user !== undefined){
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/list']);
      }else{
        this.loaderService.showLoginError('login')
      } 
    }
  }
}
