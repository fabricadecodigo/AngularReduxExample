import { ITask } from './../model/itask';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ITask[]>('api/tasks');
  }

  create(task: ITask) {
    return this.http.post<ITask>('api/tasks', task);
  }

  delete(id: number) {
    return this.http.delete(`api/tasks/${id}`);
  }

  update(task: ITask) {
    return this.http.put<ITask>(`api/tasks`, task);
  }
}
