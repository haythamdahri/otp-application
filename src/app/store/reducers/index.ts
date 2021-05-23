import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';
import { authReducer } from './auth.reducer';
import { AuthState } from './auth.reducer';


export interface State {
  auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];