import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CapitalizePipe, CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input () pokemon: any = [];
}
