import { ITask } from './../model/itask';
import { of, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskStoreService } from './../store/task-store.service';
import { TasksComponent } from './tasks.component';
import { Component, Input } from '@angular/core';

@Component({ selector: 'app-task-form', template: '<div></div>' })
class StubTaskFormComponent {
  @Input()
  task: ITask;
}

@Component({ selector: 'app-task-list', template: '<div></div>' })
class StubTaskListComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('tasks') tasks$: Observable<ITask[]>;
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  const taskStoreServiceSpy = jasmine.createSpyObj<TaskStoreService>('TaskStoreService', [
    'getAllAction',
    'createAction',
    'editAction',
    'removeAction',
    'getTasks',
    'getIsLoading',
    'getError'
  ]);

  taskStoreServiceSpy.getTasks.and.returnValue(of([]));
  taskStoreServiceSpy.getIsLoading.and.returnValue(of(false));
  taskStoreServiceSpy.getError.and.returnValue(of(''));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent, StubTaskFormComponent, StubTaskListComponent],
      providers: [
        { provide: TaskStoreService, useValue: taskStoreServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
