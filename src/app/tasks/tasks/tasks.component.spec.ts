import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskStoreService } from './../store/task-store.service';
import { TasksComponent } from './tasks.component';

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
      declarations: [TasksComponent],
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
