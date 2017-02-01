import {Component, OnInit, Input} from '@angular/core';

import {Router} from '@angular/router';
import {TlogService} from '../../../../shared/Services/tlog.service';

@Component({
    selector: 'my-workday-cell',
    templateUrl: 'workday-cell.component.html',
    styleUrls: ['workday-cell.component.scss']
})
/**
 * This component realizes the existing work days in the calendar
 */
export class WorkdayCellComponent implements OnInit {
    @Input() public dayindex: number;
    @Input() public weekindex: number;
    @Input() public minutes: number[];
    private workDayIndex: number;


    constructor(private tlogService: TlogService, private router: Router) {

    }

    /**
     * increases the value of workDayIndex with 1 and gets its new value
     */
    ngOnInit(): void {
        this.tlogService.workDayIndex = this.tlogService.workDayIndex + 1;
        this.workDayIndex = this.tlogService.workDayIndex;
    }

    /**
     * This method decides if the value of the extra minutes this day is positive or negative
     * @returns {boolean}
     */
    public isExtraMinutesPositive(): boolean {
        if (this.minutes[this.workDayIndex] >= 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * This method navigates to the task-list view, the displayed day will be the one the user clicked on
     */
    public gotToTaskListView(): void {
        let selectedYear: number = this.tlogService.selectedYear;
        let selectedMonth: number = this.tlogService.selectedMonth;
        let selectedDayOnTaskList = `${selectedYear}-${('00' + selectedMonth).substr(-2)}-${('00' + (this.tlogService.getDayValue(this.weekindex, this.dayindex))).substr(-2)}`;
        this.tlogService.selectedDayOnTaskList = selectedDayOnTaskList;
        this.router.navigate(['/tasklist']);
    }
}
