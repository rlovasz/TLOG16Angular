import {Component, OnInit, Input} from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-task-list-view',
    templateUrl: 'task-list-view.component.html'
})
export class TaskListViewComponent implements OnInit {

    selectedElement: string;

    constructor(private tlogService: TlogService, private router: Router) {
        this.selectedElement = this.tlogService.getSelectedDayOnTaskList();
    }

    ngOnInit() {
        try {
            this.tlogService.getAllDisplayedData();
        } catch (exception) {
            console.log(exception);
        }
    }

    updateElement(newValue: string): void {
        this.tlogService.setSelectedDayOnTaskList(newValue);
        this.selectedElement = newValue;
        this.tlogService.getAllDisplayedData();
    }

}
