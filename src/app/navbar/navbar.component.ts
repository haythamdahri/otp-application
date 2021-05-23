import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from '../store/actions/auth.actions';
import { AuthState } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth$?: Observable<AuthState>

  constructor(private store: Store<{auth: AuthState}>) {
    this.auth$ = store.select('auth');
   }

  ngOnInit(): void {
  }

  onSignOut() {
    // Dispatch Sign Out Action
    this.store.dispatch(authActions.logoutUser());
  }

}
