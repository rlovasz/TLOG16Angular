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
    workDaysBeans: any;
    minutes: number[] = [];
    workDayIndex: number;


    constructor(private tlogService: TlogService, private router: Router) {}

    ngOnInit() {
        this.getWorkDaysInMonth(this.tlogService.getSelectedYear(), this.tlogService.getSelectedMonth());
    }

    getWorkDaysInMonth(year: number, month: number) {
        this.tlogService._getWorkDaysInMonth(year, month).subscribe(
            (data) => {
                this.workDaysBeans = data;
                this.minutes = this.getMinutes();
                this.tlogService.setWorkDayIndex(this.tlogService.getWorkDayIndex() + 1);
                this.workDayIndex = this.tlogService.getWorkDayIndex();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getMinutes(): number[] {
        let minutesAndDays = [];
        let minutes = [];
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutesAndDays[index] = [];
            minutesAndDays[index][1] = +this.workDaysBeans[index].extraMinPerDay;
            minutesAndDays[index][0] = +this.workDaysBeans[index].actualDay.toString().split('-')[2];
        }
        minutesAndDays.sort(this.tlogService.sortFunction);
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutes[index] = minutesAndDays[index][1];
        }
        return minutes;
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
