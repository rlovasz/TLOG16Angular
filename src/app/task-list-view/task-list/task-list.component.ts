import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.scss']
})
export class TaskListComponent {

    constructor(private tlogService: TlogService) {

    }

    /**
     * Sends the edited task's informations to tlogService
     * @param taskId
     * @param comment
     * @param startTime
     * @param endTime
     */
    public getClickedEdit(taskId: string, comment: string, startTime: string, endTime: string): void {
        this.tlogService.editTaskId = taskId;
        this.tlogService.editComment = comment;
        this.tlogService.editStartTime = startTime;
        this.tlogService.editEndTime = endTime;
    }

    /**
     * Sends the deleted task's informations to tlogService
     * @param taskId
     * @param startTime
     */
    public getClickedDelete(taskId: string, startTime: string): void {
        this.tlogService.deleteTaskId = taskId;
        this.tlogService.deleteStartTime = startTime;
    }


}
