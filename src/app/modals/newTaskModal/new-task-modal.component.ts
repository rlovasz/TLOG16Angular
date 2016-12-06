import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'new-task-modal',
    templateUrl: 'new-task-modal.component.html'
})
export class NewTaskModalComponent implements OnInit {

    private task_id: string;
    private start_time: string;
    private end_time: string;
    private comment_clear: string;

    constructor(private tlogService: TlogService) { }

    ngOnInit() { }

    private resetVal() {
        this.task_id = null;
        this.start_time = null;
        this.end_time = null;
        this.comment_clear = null;
    }

    addNewTask(taskId: string, comment: string, startTime: string, endTime: string) {
        this.resetVal();
        if (comment === '' && endTime === '') {
            this.tlogService.addNewBasicTask(taskId, startTime);
        } else if (endTime === '') {
            this.tlogService.addNewTaskWithComment(taskId, comment, startTime);
        } else if (comment === '') {
            this.tlogService.addNewFinishedTask(taskId, startTime, endTime);
        } else {
            this.tlogService.addNewTask(taskId, comment, startTime, endTime);
        }
    }
}
