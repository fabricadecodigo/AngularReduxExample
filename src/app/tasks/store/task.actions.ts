import { createAction, props } from '@ngrx/store';
import { ITask } from './../model/itask';

export enum TaskActionsTypes {
  getAll = '[Task] getAll',
  getAllSucces = '[Task] getAll succes',
  create = '[Task] create',
  createSuccess = '[Task] create success',
  createError = '[Task] create error',
  update = '[Task] update',
  updateSuccess = '[Task] update success',
  remove = '[Task] remove',
  removeSuccess = '[Task] remove success',
  error = '[Task] error'
}

// Muita atenção as strings... elas devem ser unicas
export const getAll = createAction(TaskActionsTypes.getAll);
export const getAllSucces = createAction(TaskActionsTypes.getAllSucces, props<{ payload: { tasks: ITask[] } }>());
export const create = createAction(TaskActionsTypes.create, props<{ payload: { task: ITask } }>());
export const createSucces = createAction(TaskActionsTypes.createSuccess, props<{ payload: { task?: ITask, error?: string } }>());
export const createError = createAction(TaskActionsTypes.createError, props<{ payload: { task?: ITask, error?: string } }>());
export const update = createAction(TaskActionsTypes.update, props<{ payload: { task: ITask } }>());
export const updateSuccess = createAction(TaskActionsTypes.updateSuccess, props<{ payload: { task: ITask } }>());
export const remove = createAction(TaskActionsTypes.remove, props<{ payload: { id: number } }>());
export const removeSucces = createAction(TaskActionsTypes.removeSuccess, props<{ payload: { id: number } }>());
export const error = createAction(TaskActionsTypes.error, props<{ payload: { error: string } }>());
