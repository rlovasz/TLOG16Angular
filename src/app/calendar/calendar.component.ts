import { Component, OnInit } from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';

@Component({
    selector: 'my-calendar',
    templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {

    dayNameList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(private tlogService: TlogService) {

    }

    ngOnInit() {
        this.tlogService.getAllDisplayedData();
        // this.tlogService.clearLists();
        // this.tlogService.setupValues();
        // this.tlogService.getWorkDaysInMonth(this.tlogService.getSelectedYear(), this.tlogService.getSelectedMonth());
        // this.tlogService.getWorkMonthsForMonthlyStatistics();
    }



}
