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
                    this.tlogService.sendAlert(
                        '<p i18n="not expected time order">The task should begin earlier then it ends!</p>'
                    );
                }
                if (err.status === 406) {
                    this.tlogService.sendAlert(
                        '<p i18n="not valid task id alert">This task id is not valid, valid id for erxample: 7856, LT-9635, ...</p>'
                    );
                }
                if (err.status === 416) {
                    this.tlogService.sendAlert(
                        '<p i18n="quarter hours alert">The duration of the task should be multiple of the quarter hours!</p>'
                    );
                }
                if (err.status === 409) {
                    this.tlogService.sendAlert(
                        '<p i18n="not separated alert">' +
                        'The task has a common interval with an existing task, the intervals should be separated!' +
                        '</p>'
                    );
                }
                if (err.status === 411) {
                    this.tlogService.sendAlert(
                        '<p i18n="required task id and start time">' +
                        'The task id and the start time are required fields, do not leave them empty!' +
                        '</p>'
                    );
                }
                if (err.status === undefined) {
                    this.tlogService.getAllDisplayedData();
                }
            }
        );

    }
}
