import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usersmaintenance',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './usersmaintenance.component.html',
  styleUrl: './usersmaintenance.component.scss'
})
export class UsersmaintenanceComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/usersmaintenance/list']);
  }

  onSearch() {
  throw new Error('Method not implemented.');
  }
  returnToLogin() {
  throw new Error('Method not implemented.');
  }
  GoUsers() {
  throw new Error('Method not implemented.');
  }

}
