import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';




@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html'
})
export class PagerComponent implements OnInit {

    constructor(private tlogService: TlogService) { }

    ngOnInit() {
    }

    prevClick() {
        this.tlogService.selectedDate.setMonth(this.tlogService.selectedDate.getMonth() - 1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
        this.tlogService.getWorkDaysInMonth(this.tlogService.selectedYear, this.tlogService.selectedMonth);
        this.tlogService.getWorkMonthsForMonthlyStatistics();

    }

    nextClick() {
        this.tlogService.selectedDate.setMonth(this.tlogService.selectedDate.getMonth() + 1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
        this.tlogService.getWorkDaysInMonth(this.tlogService.selectedYear, this.tlogService.selectedMonth);
        this.tlogService.getWorkMonthsForMonthlyStatistics();

    }


}

