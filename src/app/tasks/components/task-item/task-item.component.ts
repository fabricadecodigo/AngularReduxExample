import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ITask } from './../../model/itask';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task: ITask;

  @Output()
  remove = new EventEmitter(false);

  @Output()
  edit = new EventEmitter(false);

  model: ITask;

  ngOnInit() {
    this.model = {...this.task};
  }

  onRemove() {
    this.remove.emit();
  }

  onEdit() {
    this.edit.emit(this.model);
  }
}
