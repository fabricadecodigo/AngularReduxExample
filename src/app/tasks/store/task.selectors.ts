import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from './../model/itask-state';

// O Selector é uma maneira de pegar apenas uma parte do estado
export const taskState = createFeatureSelector<ITaskState>('task');
export const selectedRecords = createSelector(taskState, (state: ITaskState) => state.tasks);
export const selectIsLoading = createSelector(taskState, (state: ITaskState) => state.isLoading);
export const selectError = createSelector(taskState, (state: ITaskState) => state.error);
