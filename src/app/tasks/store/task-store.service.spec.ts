import { TestBed } from '@angular/core/testing';
import { TaskStoreService } from './task-store.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('TaskStoreService', () => {
  let service: TaskStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });
    service = TestBed.inject(TaskStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
