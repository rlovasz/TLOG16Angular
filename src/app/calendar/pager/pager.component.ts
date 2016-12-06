import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';




@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html'
})
export class PagerComponent implements OnInit {

    constructor(private tlogService: TlogService) {
    }

    ngOnInit() {
    }

    prevClick() {
        let selectedDate = this.tlogService.getSelectedDate();
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        this.tlogService.setSelectedDate(selectedDate);
        this.tlogService.getAllDisplayedData();
        // this.getTheNewMonthValues();
    }

    nextClick() {
        let selectedDate = this.tlogService.getSelectedDate();
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        this.tlogService.setSelectedDate(selectedDate);
        this.tlogService.getAllDisplayedData();
        // this.getTheNewMonthValues();
    }

    // getTheNewMonthValues() {
        // this.tlogService.clearLists();
        // this.tlogService.setupValues();
        // let selectedYear = this.tlogService.getSelectedYear();
        // let selectedMonth = this.tlogService.getSelectedMonth();
        // this.tlogService.getWorkDaysInMonth(selectedYear, selectedMonth);
        // this.tlogService.getWorkMonthsForMonthlyStatistics();
    // }
}

