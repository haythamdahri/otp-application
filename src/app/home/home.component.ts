import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { OtpState } from '../store/reducers/otp.reducer';
import * as otpActions from '../store/actions/otp.actions';
import { subscribeOn, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  otp$?: Observable<OtpState>;
  private otpSubscription?: Subscription;

  constructor(
    private titleService: Title,
    private store: Store<{ otp: OtpState }>
  ) {
    this.otp$ = store.select('otp');
  }
  ngOnDestroy(): void {
    // Unsubscribe
    this.otpSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // Set title
    this.titleService.setTitle('Home - OTP Operations');
    // Fetch User OTP Operations if does not exist
    this.getUserOtpOperations();
  }

  getUserOtpOperations() {
    this.otpSubscription = this.store.select('otp').pipe(take(1)).subscribe((otpState) => {
      if( !otpState?.isLoaded ) {
        this.store.dispatch(otpActions.getUserOtpOperations());
      }
    });
  }
}
