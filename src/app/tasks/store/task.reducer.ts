import { Action, createReducer, on } from '@ngrx/store';
import { ITask } from './../model/itask';
import { ITaskState } from './../model/itask-state';
import * as TaskActions from './task.actions';
import { taskInitialState } from './task.state';

// Informações importantes
// O estado com ngrx é imutavel, ou seja, toda vez que eu preciso mudar uma informação eu preciso criar no novo estado
// ou seja eu não posso fazer o código abaixo

// state.isLoading = true;
// return state;

// para isso eu tenho que fazer
// const newState {
//   ...state, // mantenho o que eu não quero mudar
//   isLoading: true // mudo só o que eu preciso
// };
// return newState;

export const tasksFeatureKey = 'task';

const taskReducer = createReducer(
  taskInitialState,

  on(TaskActions.getAll, state => {
    const newState: ITaskState = {
      ...state,
      isLoading: true
    };

    return newState;
  }),

  on(TaskActions.getAllSucces, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: false,
      tasks: payload.tasks
    };

    return newState;
  }),

  on(TaskActions.create, state => {
    const newState: ITaskState = {
      ...state,
      isLoading: true
    };

    return newState;
  }),

  on(TaskActions.createSucces, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: false,
      tasks: [...state.tasks, payload.task]
    };

    return newState;
  }),

  on(TaskActions.createError, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: false,
      error: payload.error
    };

    return newState;
  }),

  on(TaskActions.update, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: true,
    };

    return newState;
  }),

  on(TaskActions.updateSuccess, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: false,
      tasks: state.tasks.map((task: ITask) => {
        return task.id === payload.task.id ? payload.task : task;
      })
    };

    return newState;
  }),

  on(TaskActions.remove, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: true,
    };

    return newState;
  }),

  on(TaskActions.removeSucces, (state, { payload }) => {
    const newState: ITaskState = {
      ...state,
      isLoading: false,
      tasks: state.tasks.filter((task: ITask) => {
        return task.id !== payload.id;
      })
    };

    return newState;
  })
);

export const reducer = (state: ITaskState, action: Action) => {
  return taskReducer(state, action);
};
