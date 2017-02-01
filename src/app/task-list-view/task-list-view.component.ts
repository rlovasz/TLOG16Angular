import {Component, OnInit} from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Observable} from 'rxjs';


@Component({
    selector: 'my-task-list-view',
    templateUrl: 'task-list-view.component.html',
    styleUrls: ['task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

    public selectedElement: string;

    constructor(private tlogService: TlogService) {
        this.selectedElement = this.tlogService.selectedDayOnTaskList;
    }

    /**
     * calculates all the data needed to display the task list properly and refreshes the jwt
     */
    public ngOnInit(): void {
        try {
            this.tlogService.getAllDisplayedData();
        } catch (exception) {
            console.log(exception);
        }
        this.tlogService.refreshToken();
        Observable.interval(this.tlogService.tokenRefreshIntervalInMillis).subscribe(x => {
            this.tlogService.refreshToken();
        });
    }

    /**
     * This method displays the new task list if another day will be selected from dropdown
     * @param newValue
     */
    public updateElement(newValue: string): void {
        this.tlogService.selectedDayOnTaskList = newValue;
        this.selectedElement = newValue;
        this.tlogService.getAllDisplayedData();
    }

}
