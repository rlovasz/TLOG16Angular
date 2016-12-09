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
    }

    getClickedEdit(taskId: string, comment: string, startTime: string, endTime: string) {
        this.tlogService.setEditTaskId(taskId);
        this.tlogService.setEditComment(comment);
        this.tlogService.setEditStartTime(startTime);
        this.tlogService.setEditEndTime(endTime);
    }

    getClickedDelete(taskId: string, startTime: string) {
        this.tlogService.setDeleteTaskId(taskId);
        this.tlogService.setDeleteStartTime(startTime);
    }


}
