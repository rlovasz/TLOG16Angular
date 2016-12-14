import {Component, OnInit, Input} from '@angular/core';

import {Router} from '@angular/router';
import {TlogService} from '../../../../shared/Services/tlog.service';

@Component({
    selector: 'my-workday-cell',
    templateUrl: 'workday-cell.component.html'
})
export class WorkdayCellComponent implements OnInit {
    @Input() dayindex: number;
    @Input() weekindex: number;
    @Input() minutes: number[];
    workDayIndex: number;


    constructor(private tlogService: TlogService, private router: Router) {}

    ngOnInit() {
        this.tlogService.setWorkDayIndex(this.tlogService.getWorkDayIndex() + 1);
        this.workDayIndex = this.tlogService.getWorkDayIndex();
    }

    getExtraMinStyle() {
        if (this.minutes[this.tlogService.getWorkDayIndex()] >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    gotToTaskListView(): void {
        let selectedYear = this.tlogService.getSelectedYear();
        let selectedMonth = this.tlogService.getSelectedMonth();
        let dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
        let selectedDayOnTaskList = this.tlogService.getSelectedDayOnTaskList();
        if (this.weekindex * 7 + this.dayindex + 1 - dayTypeOfFirstDay < 10) {
            if (selectedMonth < 10) {
                selectedDayOnTaskList = selectedYear.toString() + '-0' + selectedMonth.toString() + '-0' +
                    (this.weekindex * 7 + this.dayindex + 1 - dayTypeOfFirstDay).toString();
            } else {
                selectedDayOnTaskList = selectedYear.toString() + '-' + selectedMonth.toString() + '-0' +
                    (this.weekindex * 7 + this.dayindex + 1 - dayTypeOfFirstDay).toString();
            }
        } else {
            if (selectedMonth < 10) {
                selectedDayOnTaskList = selectedYear.toString() + '-0' + selectedMonth.toString() + '-' +
                    (this.weekindex * 7 + this.dayindex + 1 - dayTypeOfFirstDay).toString();
            } else {
                selectedDayOnTaskList = selectedYear.toString() + '-' + selectedMonth.toString() + '-' +
                    (this.weekindex * 7 + this.dayindex + 1 - dayTypeOfFirstDay).toString();
            }
        }
        this.tlogService.setSelectedDayOnTaskList(selectedDayOnTaskList);
        this.router.navigate(['/tasklist']);
    }
}
