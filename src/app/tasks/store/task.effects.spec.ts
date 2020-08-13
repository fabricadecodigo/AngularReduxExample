import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { ITask } from './../model/itask';
import { TasksService } from './../services/tasks.service';
import { TaskActionsTypes } from './task.actions';
import { TaskEffects } from './task.effects';

describe('TaskEffects', () => {

  let actions$: Observable<Action>;
  const tasksServiceSpy = jasmine.createSpyObj<TasksService>('TasksService', [
    'getAll',
    'create',
    'update',
    'delete'
  ]);

  let service: TaskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TasksService, useValue: tasksServiceSpy },
        TaskEffects,
        provideMockActions(() => actions$)
      ]
    });
    service = TestBed.inject(TaskEffects);
  });

  it('Given_IWantToGetAllTasks_WhenCallLoadTasksEffect_Then_ReturnsTheTasks', () => {
    actions$ = of({ type: TaskActionsTypes.getAll });
    const tasks: ITask[] = [
      { id: 1, title: 'Test 1', done: false },
      { id: 2, title: 'Test 2', done: true }
    ];
    tasksServiceSpy.getAll.and.returnValue(of(tasks));

    service.loadTasks$.subscribe(result => {
      expect(result.payload.tasks.length).toBe(2);
    });
  });

  it('Given_IWantToCreateATask_WhenCallCreateEffect_Then_ReturnsTheCreatedTask', () => {
    const task: ITask = { title: 'Test 1', done: false };
    tasksServiceSpy.create.and.returnValue(of({ ...task, id: 1 }));
    actions$ = of({ type: TaskActionsTypes.create, payload: { task } });

    service.createEffect$.subscribe((result: { payload: { task?: ITask, error?: string } }) => {
      expect(result.payload.task).toEqual({ ...task, id: 1 });
    });
  });

  it('Given_IWantToCreateATask_WhenCallCreateEffectAndGetAnError_Then_ReturnsTheError', () => {
    const task: ITask = { title: 'Test 1', done: false };
    tasksServiceSpy.create.and.returnValue(throwError('Test'));
    actions$ = of({ type: TaskActionsTypes.create, payload: { task } });

    service.createEffect$.subscribe((result: { payload: { task?: ITask, error?: string } }) => {
      expect(result.payload.error).toBe('Ocorreu algum erro ao tentar criar uma tarefa');
    });
  });

  it('Given_IWantToUpdateATask_WhenCallUpdateEffect_Then_ReturnsTheUpdatedTask', () => {
    const task: ITask = { id: 1, title: 'Test 1', done: false };
    tasksServiceSpy.update.and.returnValue(of(task));
    actions$ = of({ type: TaskActionsTypes.update, payload: { task } });

    service.updateEffect$.subscribe((result: { payload: { task: ITask } }) => {
      expect(result.payload.task).toEqual(task);
    });
  });

  it('Given_IWantToDeleteATask_WhenCallRemoveEffect_Then_ReturnsTheUpdatedTask', () => {
    const taskToDeleteId = 1;

    tasksServiceSpy.delete.and.returnValue(of(true));
    actions$ = of({ type: TaskActionsTypes.remove, payload: { id: taskToDeleteId } });

    service.removeEffect$.subscribe((result: { type: string, payload: { id: number } }) => {
      expect(result.type).toBe(TaskActionsTypes.removeSuccess);
      expect(result.payload.id).toBe(taskToDeleteId);
    });
  });
});
