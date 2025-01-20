import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
  constructor(private router: Router, private userService: UserService) {}

  goToPokedex() {
    if(this.userService.getUser().length === 0){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/list']);
    }

  }
}
