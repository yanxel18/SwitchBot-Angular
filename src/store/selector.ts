import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as Models from '../interface/Models';

export const SwitchbotState = createFeatureSelector<Models.SwitchbotState>('SwitchbotState');

export const getWorkerInfo = createSelector(SwitchbotState, (state: Models.SwitchbotState) => state.WorkerInfo);

export const getSignIn = createSelector(SwitchbotState, (state: Models.SwitchbotState) => state.UserSignIn);

export const getScanState = createSelector(SwitchbotState, (state: Models.SwitchbotState) => state.ScanComplete);
