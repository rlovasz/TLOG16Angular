import {Component, OnInit} from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';


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
        this.tlogService.refreshToken();
        Observable.interval(240000).subscribe(x => {
            this.tlogService.refreshToken();
        });
    }

    updateElement(newValue: string): void {
        this.tlogService.setSelectedDayOnTaskList(newValue);
        this.selectedElement = newValue;
        this.tlogService.getAllDisplayedData();
    }

}
