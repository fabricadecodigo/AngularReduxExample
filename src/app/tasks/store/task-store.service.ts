import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ITask } from './../model/itask';
import * as TaskActions from './task.actions';
import * as Selectors from './task.selectors';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {
  constructor(private store: Store<{}>) { }

  getAllAction() {
    this.store.dispatch(TaskActions.getAll());
  }

  createAction(record: ITask) {
    this.store.dispatch(TaskActions.create({ payload: { task: record } }));
  }

  editAction(record: ITask) {
    this.store.dispatch(TaskActions.update({ payload: { task: record } }));
  }

  removeAction(id: number) {
    this.store.dispatch(TaskActions.remove({ payload: { id } }));
  }

  getTasks() {
    return this.store.select(Selectors.selectedRecords);
  }

  getIsLoading() {
    return this.store.select(Selectors.selectIsLoading);
  }

  getError() {
    return this.store.select(Selectors.selectError);
  }
}
