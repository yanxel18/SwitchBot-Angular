import * as Models from '../interface/Models';
import * as Actions from './actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: Models.SwitchbotState = {
  WorkerInfo: [],
  UserSignIn: false,
  ScanComplete: true,
}

export const Reducer = createReducer(
  initialState,
  on(Actions.LoadWorkerInfo, (state, { payload }) => ({
    ...state,
    WorkerInfo: payload
  })),

  on(Actions.SetSignin, (state, { payload }) => ({
    ...state,
    UserSignIn: payload
  })),

  on(Actions.SetScan, (state, { payload }) => ({
    ...state,
    ScanComplete: payload
  }))
)
