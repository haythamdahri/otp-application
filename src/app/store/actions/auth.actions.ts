import { createAction, props } from '@ngrx/store';
import { UserAuthRequest } from '../../models/user-auth-request';
import { User } from '../../models/user';

export const loginUser = createAction(
  '[Auth] Login User',
  props<UserAuthRequest>()
);

export const logoutUser = createAction(
  '[Auth] Logout User'
);

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  '[Auth] Loging User Failure',
  props<{ errorMessage: string }>()
);
