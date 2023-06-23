import { MatDialog } from "@angular/material/dialog";
import { ServerService } from "./server/server.service";
import { TaskDialogComponent, TaskDialogResult } from "./task-dialog/task-dialog.component";
import { Task } from "./task/task";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { Columns } from "./columns.model";

export class AppPresenter {
    // todo: Task[] = [];
    // doing: Task[] = [];
    // done: Task[] = [];
    columns: Columns;
    
    constructor(
        private dialog: MatDialog, 
        private server: ServerService
        ){
            this.columns = {
                todo: [],
                doing: [],
                done: []
            }
        }

    getTasks(){
        this.server.getTasks().then((response: any) => {
          console.log('Response', response);
          response.map((ev: any) => {
            console.log(ev)
            ev.title = ev.task;
            return ev;
          }).forEach((task: Task) => {
            if(task.status == "todo"){
              this.columns.todo.push(task)
            }
            if(task.status == "doing"){
              this.columns.doing.push(task)
            }
            if(task.status == "done"){
              this.columns.done.push(task)
            }
          });
        });
      }

    newTask(): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
        width: '270px',
        data: {
            task: {},
        },
        });
        dialogRef
        .afterClosed()
        .subscribe((result: TaskDialogResult) => {
            if (!result) {
            return;
            }
            result.task.status = 'todo';
            this.server.createTask(result.task).then((response: any) => {
            console.log('Response', response);
            result.task.id = response.id
            console.log(result);
            this.columns.todo.push(result.task);
            });
        });
    }

    editTask(list: 'done' | 'todo' | 'doing', task: Task): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
          width: '270px',
          data: {
            task,
            enableDelete: true,
          },
        });
        dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
          if (!result) {
            return;
          }
          const dataList = this.columns[list];
          const taskIndex = dataList.indexOf(task);
          if (result.delete) {
            dataList.splice(taskIndex, 1);
            this.server.deleteTask(result.task).then((response: any) => {
              console.log('Response', response);
              });
          } else {
            dataList[taskIndex] = task;
            this.server.updateTask(result.task).then((response: any) => {
              console.log('Response', response);
              });
          }
        });
      }
    
    drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) {
            return;
        }
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
        let task = event.container.data[event.currentIndex]
        task.status = event.container.id
        this.server.updateTask(task).then((response: any) => {
            console.log('Response', response);
            });
    }

}