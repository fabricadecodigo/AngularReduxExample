import { TasksService } from './../services/tasks.service';
import { TaskStoreService } from './../store/task-store.service';
import { ITask } from './../model/itask';
import { Observable, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<ITask[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private taskStore: TaskStoreService) { }

  ngOnInit() {
    this.taskStore.getAllAction();
    this.tasks$ = this.taskStore.getTasks();
    this.isLoading$ = this.taskStore.getIsLoading();
    this.error$ = this.taskStore.getError();
  }

  onCreateTask(title: string) {
    this.taskStore.createAction({ title, done: false });
  }

  onRemoveTask(id: number) {
    this.taskStore.removeAction(id);
  }

  onEditTask(task: ITask) {
    this.taskStore.editAction(task);
  }

}
