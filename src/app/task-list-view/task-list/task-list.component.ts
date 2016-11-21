import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html'
})
export class TaskListComponent implements OnInit {



    constructor(private tlogService: TlogService) {
    }

    ngOnInit() {
        this.tlogService.getListOfTasks();
    }

    getClickedEdit(taskId: string, comment: string, startTime: string, endTime: string) {
        this.tlogService.editTaskId = taskId;
        this.tlogService.editComment = comment;
        this.tlogService.editStartTime = startTime;
        this.tlogService.editEndTime = endTime;
    }

    getClickedDelete(taskId: string, startTime: string) {
        this.tlogService.deleteTaskId = taskId;
        this.tlogService.deleteStartTime = startTime;
    }


}
