import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'otp-application';
  auth$: Observable<AuthState>;

  constructor(private store: Store<{'auth': AuthState}>) {
    this.auth$ = store.select('auth');
  }
}
