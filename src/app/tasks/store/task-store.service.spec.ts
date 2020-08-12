import { TestBed } from '@angular/core/testing';

import { TaskStoreService } from './task-store.service';

describe('TaskStoreService', () => {
  let service: TaskStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
