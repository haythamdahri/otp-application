import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { OtpState } from '../store/reducers/otp.reducer';
import * as otpActions from '../store/actions/otp.actions';
import { take } from 'rxjs/operators';
import { CustomPaginationService } from '../pagination/services/custom-pagination.service';
import { Pageable } from '../pagination/pageable';
declare var bootbox: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  otp$?: Observable<OtpState>;
  private otpSubscription?: Subscription;
  search: string = '';

  constructor(
    private titleService: Title,
    private store: Store<{ otp: OtpState }>,
    private paginationService: CustomPaginationService
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

  getNextPage(): void {
    this.otpSubscription = this.otp$?.pipe(take(1)).subscribe((otp) => {
      const pageable: Pageable = this.paginationService.getNextPage(
        otp.otpPage
      );
      // Update Page
      this.store.dispatch(otpActions.updateOtpOperationsPage(pageable));
    });
  }

  getPreviousPage(): void {
    this.otpSubscription = this.otp$?.pipe(take(1)).subscribe((otp) => {
      const pageable: Pageable = this.paginationService.getPreviousPage(
        otp.otpPage
      );
      // Update Page
      this.store.dispatch(otpActions.updateOtpOperationsPage(pageable));
    });
  }

  getPageInNewSize(pageSize: number): void {
    this.otpSubscription = this.otp$?.pipe(take(1)).subscribe((otp) => {
      const pageable: Pageable = this.paginationService.getPageInNewSize(
        otp.otpPage,
        pageSize
      );
      // Update Page
      this.store.dispatch(otpActions.updateOtpOperationsPage(pageable));
    });
  }

  async getUserOtpOperations(byPassLoadedCheck: boolean = false) {
    const fetchCheckDate: Date = new Date();
    const now: Date = new Date();
    (fetchCheckDate).setMinutes(now.getMinutes() - 30);
    this.otpSubscription = this.otp$?.pipe(take(1)).subscribe((otpState) => {
      // Do Loaded Check
      if (byPassLoadedCheck || !otpState?.isLoaded || fetchCheckDate >= otpState?.lastFetch! || otpState?.otpPage?.content?.length === 0 ) {
        // Get copy of pageable
        const pageable: Pageable = JSON.parse(
          JSON.stringify(otpState?.otpPage?.pageable)
        );
        // Update search
        pageable.search = this.search;
        this.store.dispatch(otpActions.getUserOtpOperations(pageable));
      }
    });
  }

  onOtpDelete(id: number) {
    // User Confirmation
    bootbox.confirm(
      'Would you like to delete this OTP operation permanently?',
      (result: any) => {
        if (result) {
          // Dispatch action
          this.store.dispatch(otpActions.deleteOtpOperation({ id }));
        }
      }
    );
  }

  onSearch() {
    // Dispatch search
    this.getUserOtpOperations(true);
  }
}
