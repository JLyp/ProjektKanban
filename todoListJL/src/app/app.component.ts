import { Component, OnInit } from '@angular/core';
import { Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ServerService } from './server/server.service';
import { reduce } from 'rxjs';
import { AppPresenter } from './app.presenter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoListJL';

  private appPresenter: AppPresenter;

  constructor(
    private dialog: MatDialog, 
    private server: ServerService
    ) {
      this.appPresenter = new AppPresenter(dialog, server);
    }

  ngOnInit(): void {
    this.getTasks();
  }

  getTodo(){
    return this.appPresenter.columns.todo
  }

  getDoing(){
    return this.appPresenter.columns.doing
  }

  getDone(){
    return this.appPresenter.columns.done
  }

  getTasks(){
    return this.appPresenter.getTasks()
  }

  newTask(){
    this.appPresenter.newTask()
  }

  editTask(list: 'done' | 'todo' | 'doing', task: Task): void {
    this.appPresenter.editTask(list, task)
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.appPresenter.drop(event)
  }
  
}
