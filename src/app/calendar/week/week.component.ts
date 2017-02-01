import { Component, OnInit, Input} from '@angular/core';
import {Week, Day, WorkDay} from '../../shared/Classes/Classes';
import {TlogService} from '../../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.scss']

})
/**
 * This component is responsible for displaying one week in the calendar
 */
export class WeekComponent implements OnInit {

    @Input() private week: Week;
    @Input() public weekindex: number;
    @Input() private workDaysBeans: Array<WorkDay>;
    public minutes: number[] = [];
    public days: Day[] = [];

    constructor(private tlogService: TlogService,  private router: Router) {

    }

    /**
     * Sets the days array using the input week and gets the work days in the actual month
     */
    ngOnInit() {
        this.days = this.week.week;
        this.getWorkDaysInMonth(this.tlogService.selectedYear, this.tlogService.selectedMonth);
    }

    private getWorkDaysInMonth(year: number, month: number): void {
        this.tlogService.fetchWorkDaysInMonthFromBackend(year, month).subscribe(
            (data) => {
                this.tlogService.loggedIn = true;
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



    private getMinutes(): number[] {
        let minutesAndDays: any[] = [];
        let minutes: number[] = [];
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutesAndDays[index] = [];
            minutesAndDays[index][1] = +this.workDaysBeans[index].extraMinPerDay;
            minutesAndDays[index][0] = +this.workDaysBeans[index].actualDay.toString().split('-')[2];
        }
        minutesAndDays.sort(TlogService.sortFunction);
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            minutes[index] = minutesAndDays[index][1];
        }
        return minutes;
    }

    /**
     * Decides using the isWorkday word if one day is a work day or not
     * @param isWorkday can be 'work', 'empty', or 'notempty'
     * @returns {boolean}
     */
    public isThisWorkday(isWorkday: string): boolean {
        if (isWorkday === 'work') {
            return true;
        } else {
            return false;
        }
    }

}

