import * as Models from '../interface/Models';
import { createAction, props } from '@ngrx/store';

export const LOAD_WORKERINFO = '[LOAD WORKER] WorkerInfo';

export const SET_SIGNIN = '[SET SIGN_IN] Worker Sign-in';

export const LoadWorkerInfo = createAction(LOAD_WORKERINFO,
  props<{payload: Models.WorkerInfo[]}>());

export const SetSignin = createAction(SET_SIGNIN,
  props<{payload: boolean }>());
