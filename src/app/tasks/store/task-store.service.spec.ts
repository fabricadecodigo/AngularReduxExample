import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ITask } from '../model/itask';
import { ITaskState } from './../model/itask-state';
import { TaskStoreService } from './task-store.service';
import * as fromSelector from './task.selectors';

describe('TaskStoreService', () => {
  let service: TaskStoreService;
  let mockStore: MockStore;
  let mockIsLoadingSelector: MemoizedSelector<ITaskState, boolean>;
  let mockErrorSelector: MemoizedSelector<ITaskState, string>;
  let mockTasksSelector: MemoizedSelector<ITaskState, ITask[]>;

  // os métodos getAllAction, createAction, editAction, removeAction não são possiveis testar.
  // para garantir o funcionamento, vamos testar os Effects que são executados por esses métodos

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });
    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(TaskStoreService);

    mockIsLoadingSelector = mockStore.overrideSelector(
      fromSelector.selectIsLoading,
      false
    );

    mockErrorSelector = mockStore.overrideSelector(
      fromSelector.selectError,
      null
    );

    mockTasksSelector = mockStore.overrideSelector(
      fromSelector.selectedRecords,
      []
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Given_IGetIsLoadingState_When_SetToTrue_Then_ReturnsTrue', () => {
    mockIsLoadingSelector.setResult(true);
    mockStore.refreshState();
    service.getIsLoading().subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  it('Given_IGetIsLoadingState_When_SetToFalse_Then_ReturnsFalse', () => {
    mockIsLoadingSelector.setResult(false);
    mockStore.refreshState();
    service.getIsLoading().subscribe(result => {
      expect(result).toBeFalse();
    });
  });

  it('Given_IGetErrorState_When_SetAnErrorMessage_Then_ReturnsTheMessage', () => {
    const errorMessage = 'An error message test';
    mockErrorSelector.setResult(errorMessage);
    mockStore.refreshState();
    service.getError().subscribe(error => {
      expect(error).toBe(errorMessage);
    });
  });

  it('Given_IGetErrorState_When_SetNullErrorMessage_Then_ReturnsNull', () => {
    mockErrorSelector.setResult(null);
    mockStore.refreshState();
    service.getError().subscribe(error => {
      expect(error).toBeNull();
    });
  });

  it('Given_IGetAllTasks_When_HaveTasks_Then_ReturnsTasks', () => {
    mockTasksSelector.setResult([
      { id: 1, title: 'Test 1', done: false },
      { id: 2, title: 'Test 2', done: true }
    ]);
    mockStore.refreshState();
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
    });
  });

  it('Given_IGetAllTasks_When_NotHaveTasks_Then_ReturnsEmptyArrayOfTasks', () => {
    mockTasksSelector.setResult([]);
    mockStore.refreshState();
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(0);
    });
  });
});
