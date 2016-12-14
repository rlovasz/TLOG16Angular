import { Component, OnInit, Input} from '@angular/core';
import {Week, Day} from '../../shared/Classes/Classes';
import {TlogService} from '../../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-week',
    templateUrl: 'week.component.html'

})
export class WeekComponent implements OnInit {

    @Input() week: Week;
    @Input() weekindex: number;
    workDaysBeans: any;
    minutes: number[] = [];
    days: Day[] = [];
    constructor(private tlogService: TlogService, private router: Router) {

    }

    ngOnInit() {
        this.days = this.week.week;
        this.getWorkDaysInMonth(this.tlogService.getSelectedYear(), this.tlogService.getSelectedMonth());
    }

    getWorkDaysInMonth(year: number, month: number) {
        this.tlogService._getWorkDaysInMonth(year, month).subscribe(
            (data) => {
                this.tlogService.setLoggedIn(true);
                this.workDaysBeans = data;
                this.minutes = this.getMinutes();
            },
            (error) => {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                }
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

    getWorkDayStyle(isWorkday: string) {
        if (isWorkday === 'work') {
          return 'white';
        }
    }

}

