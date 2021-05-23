import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/reducers/auth.reducer';
import * as authActions from '../store/actions/auth.actions';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  auth$?: Observable<AuthState>;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private store: Store<{auth: AuthState}>, private titleService: Title) {
    this.auth$ = store.select('auth');
   }

  ngOnInit(): void {
    // Set page title
    this.titleService.setTitle('OTP - Sign In');
  }

  onLogin() {
    this.store.dispatch(authActions.loginUser(this.form.value));
  }

}
