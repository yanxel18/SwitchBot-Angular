import * as Models from '../interface/Models';
import * as Actions from './actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: Models.SwitchbotState = {
  WorkerInfo: []
}

export const Reducer = createReducer(
  initialState,
  on(Actions.LoadWorkerInfo, (state, {payload }) => ({
    ...state,
    WorkerInfo: payload
  }))
)
