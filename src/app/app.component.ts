import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'challenge-juliodiaz';
  loadervisible: boolean = false; 
  private unsubscribe$ = new Subject<void>();

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loaderService.showLoader$.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.loadervisible = value;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
