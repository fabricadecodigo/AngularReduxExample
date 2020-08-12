import { ITask } from './../model/itask';
import { createFeatureSelector, createSelector} from '@ngrx/store';

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  error: string;
}

// Estado inicial da tela
export const taskInitialState: ITaskState = {
  tasks: [],
  isLoading: false,
  error: null
};

// O Selector é uma maneira de pegar apenas uma parte do estado
export const taskState = createFeatureSelector<ITaskState>('task');
export const selectedRecords = createSelector(taskState, (state: ITaskState) => state.tasks);
export const selectIsLoading = createSelector(taskState, (state: ITaskState) => state.isLoading);
export const selectError = createSelector(taskState, (state: ITaskState) => state.error);
