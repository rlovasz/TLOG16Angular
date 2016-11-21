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


    constructor(private tlogService: TlogService, private router: Router) {

    }

    getMinutes(): number[] {
        let minutesAndDays = [];
        let minutes = [];
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutesAndDays[index] = [];
            minutesAndDays[index][1] = +this.workDaysBeans[index].extraMinPerDay;
            minutesAndDays[index][0] = +this.workDaysBeans[index].actualDay.toString().split('-')[2];
        }
        minutesAndDays.sort(this.sortFunction);
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutes[index] = minutesAndDays[index][1];
        }
        return minutes;
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

    sortFunction(a, b): number {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    getStyle() {
        if (this.minutes[this.tlogService.getWorkDayIndex()] >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    ngOnInit() {
        this.getWorkDaysInMonth(this.tlogService.selectedYear, this.tlogService.selectedMonth);
    }

    gotoTaskListView(): void {
        if (this.weekindex * 7 + this.dayindex + 1 - this.tlogService.dayTypeOfFirstDay < 10) {
            this.tlogService.selectedElement = this.tlogService.selectedYear.toString() + '-' +
                this.tlogService.selectedMonth.toString() + '-0' +
                (this.weekindex * 7 + this.dayindex + 1 - this.tlogService.dayTypeOfFirstDay).toString();
        } else {
            this.tlogService.selectedElement = this.tlogService.selectedYear.toString() + '-' +
                this.tlogService.selectedMonth.toString() + '-' +
                (this.weekindex * 7 + this.dayindex + 1 - this.tlogService.dayTypeOfFirstDay).toString();
        }
        this.router.navigate(['/tasklist']);


    }

}
