import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Task } from '../task/task';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {}
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getTasks() {
    return this.request('GET', `${environment.serverUrl}/tasks`);
  }

  createTask(event: Task) {
    console.log(event)
    return this.request('POST', `${environment.serverUrl}/task`, event);
  }

  updateTask(event: Task) {
    return this.request('PUT', `${environment.serverUrl}/task/${event.id}`, event);
  }

  deleteTask(event: Task) {
    return this.request('DELETE', `${environment.serverUrl}/task/${event.id}`);
  }
}