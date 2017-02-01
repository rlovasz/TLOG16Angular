import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'new-task-modal',
    templateUrl: 'new-task-modal.component.html',
    styleUrls: ['../modals.scss', 'new-task-modal.component.scss']
})
/**
 * This component contains a modal wich comes up when the user wants to create a new task
 */
export class NewTaskModalComponent {

    public task_id: string;
    public start_time: string;
    public end_time: string;
    public comment_clear: string;

    constructor(private tlogService: TlogService) {

    }

    /**
     * Resets the values of the input boxes of the modal
     */
    public resetVal(): void {
        this.task_id = null;
        this.start_time = null;
        this.end_time = null;
        this.comment_clear = null;
    }

    /**
     * Creates the new task with the given data with a backend call
     * @param taskId
     * @param comment
     * @param startTime
     * @param endTime
     */
    public addNewTask(taskId: string, comment: string, startTime: string, endTime: string): void {
        this.resetVal();
        if (!comment && !endTime) {
            this.tlogService.addNewBasicTaskWithOptionalCommentOnBackend(taskId, startTime);
        } else if (!endTime) {
            this.tlogService.addNewBasicTaskWithOptionalCommentOnBackend(taskId, startTime, comment);
        } else if (!comment) {
            this.tlogService.addNewFinishedTaskWithOptionalCommentOnBackend(taskId, startTime, endTime);
        } else {
            this.tlogService.addNewFinishedTaskWithOptionalCommentOnBackend(taskId, startTime, endTime, comment);
        }
    }
}
