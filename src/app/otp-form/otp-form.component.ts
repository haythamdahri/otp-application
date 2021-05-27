import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Otp } from '../models/otp';
import { OtpCheckRequest } from '../models/otp-check-request';
import { OtpService } from '../services/otp.service';
import { OtpState } from '../store/reducers/otp.reducer';
import * as otpActions from '../store/actions/otp.actions';
import { OtpResponse } from '../models/otp-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Pageable } from '../pagination/pageable';
import { OtpRequest } from '../models/otp-request';
declare var bootbox: any;

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css'],
})
export class OtpFormComponent implements OnInit, OnDestroy {
  otp?: Otp = new Otp();
  otpRequest: OtpRequest = new OtpRequest();
  private routeSubscription?: Subscription;
  private otpSubscription?: Subscription;
  isLoading: boolean = true;
  isError: boolean = false;
  isInvalidOtpCode: boolean = false;
  notFoundOtp: boolean = false;
  invalidOtpCodeMessage: string = '';
  transactionNumberAlreadyTaken: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private otpService: OtpService,
    private router: Router,
    private store: Store<{ otp: OtpState }>
  ) {}

  ngOnInit(): void {
    // Set title
    this?.titleService?.setTitle('OTP Form');
    // Subscribe to route params changes
    this.routeSubscription = this?.route?.params?.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.otp!.id = params['id'];
          this.getOtp();
        } else {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from observables
    this?.routeSubscription?.unsubscribe();
    this?.otpSubscription?.unsubscribe();
  }

  getOtp(transactionNumber: string = '', redirect: boolean = false) {
    this.isLoading = true;
    this.isError = false;
    // Fetch by ID or Transaction Number
    if (transactionNumber !== '') {
      this.otpSubscription = this.otpService
        .getOtpOperationByTransactionNumber(transactionNumber)
        .subscribe(
          (otp) => {
            // If redirect
            if (redirect) {
              // Redirect to otp form check page
              this.router.navigateByUrl(`/otp/save/${otp?.id}`);
              return;
            }
            this.otp = otp;
            this.isLoading = false;
          },
          (error: HttpErrorResponse) => {
            this.isError = true;
            this.isLoading = false;
            // Check if does not exists
            this.notFoundOtp = error?.error?.statusCode === 404 ? true : false
          }
        );
      return;
    }
    // Fetch By Id
    this.otpSubscription = this.otpService
      .getOtpOperation(this?.otp?.id!)
      .subscribe(
        (otp) => {
          this.otp = otp;
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.isLoading = false;
          // Check if does not exists
          this.notFoundOtp = error?.error?.statusCode === 404 ? true : false
        }
      );
  }

  onOtpCheck() {
    this.isLoading = true;
    const otpCheckRequest: OtpCheckRequest = {
      transactionNumber: this.otp?.transactionNumber,
      otp: this.otp?.code,
    };
    // Check OTP
    this.otpSubscription = this.otpService
      .checkOtpOperation(otpCheckRequest)
      .subscribe(
        (otpResponse: OtpResponse) => {
          this.isLoading = false;
          this.otp!.state = otpResponse.state;
          this.isInvalidOtpCode = false;
          this.invalidOtpCodeMessage = '';
          // Dispatch GET OTP Operations
          this.store.dispatch(otpActions.getUserOtpOperations(new Pageable()));
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          // Extract Error Response
          this.isInvalidOtpCode =
            error?.error?.statusCode === 400 ? true : false;
          this.invalidOtpCodeMessage = error?.error?.message;
          // Check if OTP is blocked
          if (
            this.isInvalidOtpCode &&
            this.invalidOtpCodeMessage.toLocaleLowerCase().includes('blocked')
          ) {
            this.otp!.state = 'BLOCKED';
            // Dispatch GET OTP Operations
            this.store.dispatch(
              otpActions.getUserOtpOperations(new Pageable())
            );
            return;
          }
          // Error display
          bootbox.alert({
            message: error?.error?.message || 'Internal server error, please try again!',
            backdrop: true,
          });
        }
      );
  }

  onOtpSend() {
    this.transactionNumberAlreadyTaken = false;
    this.isLoading = true;
    this.otpSubscription = this.otpService.sendOtp(this?.otpRequest!).subscribe(
      (otpResponse: OtpResponse) => {
        // Fetch OTP Operation by transactionNumber and redirect
        this.getOtp(otpResponse?.transactionNumber, true);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        // Extract Error Response
        this.transactionNumberAlreadyTaken =
          error?.error?.statusCode === 400 ? true : false;
        bootbox.alert({
          message: error?.error?.message,
          backdrop: true,
        });
      }
    );
  }

  isValidForm() {
    return (
      this?.otpRequest?.transactionNumber !== '' &&
      this?.otpRequest?.channel !== '' &&
      (this?.otpRequest?.email !== '' || this?.otpRequest?.phone)
    );
  }
}
