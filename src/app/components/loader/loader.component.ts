import { Component, OnInit, effect } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  state: 'loading' | 'error' | 'login' = 'loading';
  from: 'detail' | 'list' | 'login' = 'list';

  constructor(private loaderService: LoaderService, private router: Router) {
    effect(() => {
      this.state = this.loaderService.loaderState();
      this.from = this.loaderService.from();
    });
  }

  ngOnInit(): void {
  }

  Close() {
    switch (this.from) {
      case 'list':
      this.router.navigate(['/login']);
      break;
      case 'detail':
      this.router.navigate(['/list']);
      break;
      default:
      this.loaderService.closeLoading();
      break;
    }
  }
}

