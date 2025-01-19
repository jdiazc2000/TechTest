import { Component } from '@angular/core';
import { User } from '../../core/models/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Ash Ketchum',
      town: 'Pueblo Paleta',
      registrationDate: '2024-01-10',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' // Pikachu
    },
    {
      id: 2,
      name: 'Misty',
      town: 'Ciudad Celeste',
      registrationDate: '2024-02-15',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png' // Goldeen
    },
    {
      id: 3,
      name: 'Brock',
      town: 'Ciudad Plateada',
      registrationDate: '2024-03-20',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png' // Onix
    },
    {
      id: 4,
      name: 'Gary Oak',
      town: 'Pueblo Paleta',
      registrationDate: '2024-04-05',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' // Eevee
    },
    {
      id: 5,
      name: 'Tracey Sketchit',
      town: 'Islas Naranja',
      registrationDate: '2024-05-12',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/235.png' // Smeargle
    },
    {
      id: 6,
      name: 'May',
      town: 'Ciudad Petalia',
      registrationDate: '2024-06-18',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png' // Torchic
    },
    {
      id: 7,
      name: 'Dawn',
      town: 'Pueblo Hojasgemelas',
      registrationDate: '2024-07-22',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png' // Piplup
    },
    {
      id: 8,
      name: 'Serena',
      town: 'Ciudad Vaniville',
      registrationDate: '2024-08-30',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png' // Froakie
    },
    {
      id: 9,
      name: 'Lillie',
      town: 'Ciudad Hauoli',
      registrationDate: '2024-09-05',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png' // Porygon
    },
    {
      id: 10,
      name: 'Gladion',
      town: 'Ciudad Malie',
      registrationDate: '2024-10-10',
      photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png' // Zoroark
    }
  ];

  constructor(private userService: UserService) {
    if (!sessionStorage.getItem('users') || sessionStorage.getItem('users') === '[]') {
      sessionStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  ngOnInit() {
    this.userService.users$.subscribe(data => (this.users = data));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  openUserForm() {
    throw new Error('Method not implemented.');
  }
}
