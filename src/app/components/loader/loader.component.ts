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
  state: 'loading' | 'error'  = 'loading';
  from: 'detail' | 'list' = 'list';

  constructor(private loaderService: LoaderService, private router: Router) {
    effect(() => {
      this.state = this.loaderService.loaderState();
      this.from = this.loaderService.from();
    });
  }

  ngOnInit(): void {
  }

  Close() {
    if(this.from === 'list'){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/list']);
    }
  }
}

