import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'new-task-modal',
    templateUrl: 'new-task-modal.component.html'
})
export class NewTaskModalComponent implements OnInit {

    constructor(private tlogService: TlogService) { }

    ngOnInit() { }

    addNewTask(taskId: string, comment: string, startTime: string, endTime: string) {
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
