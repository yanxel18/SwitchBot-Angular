import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as Models from '../interface/Models';

export const SwitchbotState = createFeatureSelector<Models.SwitchbotState>('SwitchbotState');

export const getWorkerInfo = createSelector(SwitchbotState, (state: Models.SwitchbotState) => state.WorkerInfo);
