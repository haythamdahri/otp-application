import { AuthService } from './auth.service';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ auth: AuthState }>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    // Retrieve connected user info
    this.store.select('auth').pipe(
      first(),
      map((authState: AuthState) => {
        if (
          authState?.isAuthenticated &&
          authState?.user?.token &&
          authState?.user?.token !== ''
        )
          req = req.clone({
            setHeaders: {
              Authorization: authState?.user?.token,
            },
          });
        // Forward request handling
        return next.handle(req);
      })
    );
  }
}
