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

  constructor(private store: TaskStoreService, private tasksService: TasksService) { }

  ngOnInit() {
    this.store.getAllAction();
    this.tasks$ = this.store.getTasks();
    this.isLoading$ = this.store.getIsLoading();
    this.error$ = this.store.getError();
  }

  onCreateTask(title: string) {
    this.store.createAction({ title, done: false });
  }

  onRemoveTask(id: number) {
    this.store.removeAction(id);
  }

  onEditTask(task: ITask) {
    this.store.editAction(task);
  }

}
