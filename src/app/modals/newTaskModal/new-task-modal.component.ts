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
        console.log(taskId);
        console.log(comment);
        console.log(startTime);
        console.log(endTime);
        if (comment === '' && endTime === '') {
            console.log(1);
            this.tlogService.addNewBasicTask(taskId, startTime);
        } else if (endTime === '') {
            console.log(2);
            this.tlogService.addNewTaskWithComment(taskId, comment, startTime);
        } else if (comment === '') {
            console.log(3);
            this.tlogService.addNewFinishedTask(taskId, startTime, endTime);
        } else {
            console.log(4);
            this.tlogService.addNewTask(taskId, comment, startTime, endTime);
        }

    }
}
