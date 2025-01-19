import { Injectable, signal} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoader = new BehaviorSubject<boolean>(false);
  loaderState = signal<'loading' | 'error'>('loading');
  from = signal< 'detail' | 'list'>('list');

  showLoader$ = this.showLoader.asObservable()

  showLoading() {
    this.showLoader.next(true);
    this.loaderState.set('loading');
  }

  showLoadingError(from: 'detail' | 'list') {
    this.from.set(from);
    this.showLoader.next(true);
    this.loaderState.set('error');
  }

  closeLoading(){
    this.showLoader.next(false);
  }
}


