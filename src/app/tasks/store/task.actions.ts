import { Action, createAction, props } from '@ngrx/store';
import { ITask } from './../model/itask';

// Muita atenção as strings... elas devem ser unicas
export const getAll = createAction('[Task] getAll');
export const getAllSucces = createAction('[Task] getAll succes', props<{ payload: { tasks: ITask[] } }>());
export const create = createAction('[Task] create', props<{ payload: { task: ITask } }>());
export const createSucces = createAction('[Task] create succes', props<{ payload: { task: ITask } }>());
export const createError = createAction('[Task] create error', props<{ payload: { error: string } }>());
export const update = createAction('[Task] update', props<{ payload: { task: ITask } }>());
export const updateSuccess = createAction('[Task] update success', props<{ payload: { task: ITask } }>());
export const remove = createAction('[Task] remove', props<{ payload: { id: number } }>());
export const removeSucces = createAction('[Task] remove success', props<{ payload: { id: number } }>());
export const error = createAction('[Task] error', props<{ payload: { error: string} }>());
