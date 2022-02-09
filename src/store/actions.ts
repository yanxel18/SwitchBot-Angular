import * as Models from '../interface/Models';
import { createAction, props } from '@ngrx/store';

export const LOAD_WORKERINFO = '[LOAD WORKER] WorkerInfo';

export const LoadWorkerInfo = createAction(LOAD_WORKERINFO,
  props<{payload: Models.WorkerInfo[]}>());
