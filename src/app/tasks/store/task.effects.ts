import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TasksService } from './../services/tasks.service';
import * as TaskActions from './task.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksService
  ) { }

  loadTasks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TaskActions.getAll),
        mergeMap(() => {
          return this.tasksService.getAll()
            .pipe(
              map(tasks => {
                return TaskActions.getAllSucces({ payload: { tasks } });
              })
            );
        })
      );
  });

  createEffect$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TaskActions.create),
        mergeMap((action) => {
          return this.tasksService.create(action.payload.task)
            .pipe(
              map(task => {
                return TaskActions.createSucces({ payload: { task } });
              }),
              catchError(() => { // exemplo com erro
                return of(TaskActions.createError({ payload: { error: 'Ocorreu algum erro ao tentar criar uma tarefa' } }));
              })
            );
        }));
  });

  updateEffect$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TaskActions.update),
        mergeMap((action) => {
          return this.tasksService.update(action.payload.task)
            .pipe(
              map(() => {
                return TaskActions.updateSuccess({ payload: { task: action.payload.task } });
              })
            );
        }));
  });

  removeEffect$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TaskActions.remove),
        mergeMap((action) => {
          return this.tasksService.delete(action.payload.id)
            .pipe(
              map(() => {
                return TaskActions.removeSucces({ payload: { id: action.payload.id } });
              })
            );
        }));
  });
}
