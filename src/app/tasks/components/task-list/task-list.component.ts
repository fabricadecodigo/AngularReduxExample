import { ITask } from './../../model/itask';
import { Observable } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input('tasks') tasks$: Observable<ITask[]>;

  @Output()
  remove = new EventEmitter(false);

  @Output()
  edit = new EventEmitter(false);

  onRemove(task) {
    this.remove.emit(task);
  }

  onUpdate(task) {
    this.edit.emit(task);
  }
}
