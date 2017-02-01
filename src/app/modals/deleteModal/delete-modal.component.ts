import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'delete-modal',
    templateUrl: 'delete-modal.component.html',
    styleUrls: ['../modals.scss', 'delete-modal.component.scss']
})
/**
 * This component contains a modal which comes up if the user wants to delete a task
 */
export class DeleteModalComponent {

    constructor(private tlogService: TlogService) {

    }

}
