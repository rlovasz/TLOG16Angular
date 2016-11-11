import {Component, OnInit, Input} from '@angular/core';
import {Week, Day} from '../../shared/classes/Classes';
import {TlogService} from '../../shared/services/tlog.service';


@Component({
    selector: 'my-week',
    templateUrl: 'week.component.html'

})
export class WeekComponent implements OnInit {

    @Input() week: Week;
    @Input() weekindex: number;
    public days: Day[] = [];
    public isWorkDay: boolean[] = [false, false, false, false, false, false, false];
    public workDaysNumberOfDay: number[] = [];
    public dayTypeOfFirstDay: number;

    constructor (private tlogService: TlogService) {}

    ngOnInit() {
        this.dayTypeOfFirstDay =  this.tlogService.getDayTypeOfFirstDay();
        this.workDaysNumberOfDay = this.tlogService.getWorkDaysNumberOfDay();
        this.days = this.week.week;
        for (let dayIndex = 0; dayIndex < this.days.length; dayIndex++) {
            for (let workDayIndex = 0; workDayIndex < this.workDaysNumberOfDay.length; workDayIndex++) {
                if (this.weekindex * 7 + dayIndex + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDayIndex]) {
                    this.isWorkDay[dayIndex] = true;
                }
            }

        }
    }

    public getStyle(isWorkday: boolean) {
        if (isWorkday === true) {
            return 'white';
        }
    }

}

