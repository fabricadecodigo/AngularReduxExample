import { ITaskState } from './../model/itask-state';

// Estado inicial da tela
export const taskInitialState: ITaskState = {
  tasks: [],
  isLoading: false,
  error: null
};
