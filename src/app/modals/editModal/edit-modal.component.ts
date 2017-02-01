import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'edit-modal',
    templateUrl: 'edit-modal.component.html',
    styleUrls: ['../modals.scss', 'edit-modal.component.scss']
})
/**
 * This component comtains a modal which comes up when the user wants to modify one of its task
 */
export class EditModalComponent {

    constructor(private tlogService: TlogService) {

    }

    /**
     * This method does the modifications with a backend call based on the input values
     * @param newTaskId the new value of task id
     * @param newComment the new value of comment
     * @param newStartTime the new value of start time
     * @param newEndTime the new value of end time
     */
    public modifyTaskWithGivenData(newTaskId: string, newComment: string, newStartTime: string, newEndTime: string): void {
        this.tlogService.modifyTaskOnBackend(newTaskId, newComment, newStartTime, newEndTime).subscribe(
            (data) => {

            },
            (err) => {
                if (err.status === 417) {
                    this.tlogService.sendAlert('The task should begin earlier then it ends!');
                }
                if (err.status === 406) {
                    this.tlogService.sendAlert('This task id is not valid, valid id for erxample: 7856, LT-9635, ...');
                }
                if (err.status === 416) {
                    this.tlogService.sendAlert('The duration of the task should be multiple of the quarter hours!');
                }
                if (err.status === 409) {
                    this.tlogService.sendAlert('The task has a common interval with an existing task, the intervals should be separated!');
                }
                if (err.status === undefined) {
                    this.tlogService.getAllDisplayedData();
                }
            }
        );

    }
}
