import { ITask } from './../../model/itask';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  title: string;

  @Input()
  task: ITask;

  @Output()
  createTask: EventEmitter<string> = new EventEmitter();

  onSubmit() {
    this.title = this.title.trim();

    if (this.title) {
      this.createTask.emit(this.title);
    }

    this.title = '';
  }
}
