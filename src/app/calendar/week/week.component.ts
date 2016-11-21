import { Component, OnInit, Input} from '@angular/core';
import {Week, Day} from '../../shared/Classes/Classes';


@Component({
    selector: 'my-week',
    templateUrl: 'week.component.html'

})
export class WeekComponent implements OnInit {

    @Input() week: Week;
    @Input() weekindex: number;
    days: Day[] = [];
    constructor() {

    }

    ngOnInit() {
        this.days = this.week.week;
    }

    getWorkDayStyle(isWorkday: string) {
        if (isWorkday === 'work') {
          return 'white';
        }
    }

}

