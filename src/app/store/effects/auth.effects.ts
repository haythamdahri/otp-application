import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as authActions from '../actions/auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginUser),
      exhaustMap((action) => {
        return this.authService
          .signIn({ username: action.username, password: action.password })
          .pipe(
            map((user) => authActions.loginUserSuccess({ user })),
            catchError((error: Error) => {
              return of(
                authActions.loginUserFailure({
                  errorMessage: 'Username or password is incorrect',
                })
              );
            })
          );
      })
    )
  );

  @Effect({ dispatch: false })
  loginUserSuccess$ = this.actions$.pipe(
    ofType(authActions.loginUserSuccess),
    tap((action) => this.router.navigateByUrl('/'))
  );

  @Effect({ dispatch: false })
  logoutUser$ = this.actions$.pipe(
    ofType(authActions.logoutUser),
    tap(() => {
      this.authService.signOut();
      // Redirect to signin
      this.router.navigateByUrl('/signin');
    })
  );
}
