import { Task } from './../interfaces/task-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTask() {
    return this.http.get('/tasks');
  }

  createTask(data: Task) {
    return this.http.post('/tasks', data);
  }

  getOneTask() {
    return this.http.get('/tasks');
  }

  updateTask(data: Task) {
    const urlEdit = '/tasks' + '/' + data.id;
    return this.http.put(urlEdit, data);
  }

  deleteTask(task) {
    return this.http.delete('/tasks' + '/' + task.id);
  }
}
