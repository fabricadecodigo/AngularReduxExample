import { ITask } from './../../model/itask';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  title: string;

  @Input()
  task: ITask;

  @Output()
  createTask: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
    }
  }

  onSubmit() {
    this.title = this.title.trim();

    if (this.title) {
      this.createTask.emit(this.title);
    }

    this.title = '';
  }
}
