import { Injectable, signal} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoader = new BehaviorSubject<boolean>(false);
  loaderState = signal<'loading' | 'error' | 'login'>('loading');
  from = signal< 'detail' | 'list' | 'login'>('list');

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

  showLoginError(from: 'detail' | 'list' | 'login') {
    this.from.set(from);
    this.showLoader.next(true);
    this.loaderState.set('login');
  }

  closeLoading(){
    this.showLoader.next(false);
    this.loaderState.set('loading')
  }
}


