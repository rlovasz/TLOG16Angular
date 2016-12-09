import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'edit-modal',
    templateUrl: 'edit-modal.component.html'
})
export class EditModalComponent implements OnInit {

    constructor(private tlogService: TlogService) { }

    ngOnInit() { }

    modifyTaskWithGivenData(newTaskId: string, newComment: string, newStartTime: string, newEndTime: string) {
        this.tlogService.modifyTask(newTaskId, newComment, newStartTime, newEndTime).subscribe(
            (data) => {

            },
            (err) => {
                if (err.status === 417) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'The task should begin earlier then it ends!'
                    });
                }
                if (err.status === 406) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'This task id is not valid, valid id for erxample: 7856, LT-9635, ...'
                    });
                }
                if (err.status === 416) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'The duration of the task should be multiple of the quarter hours!'
                    });
                }
                if (err.status === 409) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'The task has a common interval with an existing task, the intervals should be separated!'
                    });
                }
                if (err.status === undefined) {
                    this.tlogService.getAllDisplayedData();
                }
            }
        );

    }
}
