import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-usersmaintenance',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './usersmaintenance.component.html',
  styleUrl: './usersmaintenance.component.scss'
})
export class UsersmaintenanceComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/usersmaintenance']);
  }

  returnToPokemonList() {
    this.router.navigate(['/list']);
  }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

}
