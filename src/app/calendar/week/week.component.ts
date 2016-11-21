import { Component, OnInit, Input} from '@angular/core';
import {Week, Day} from '../../shared/Classes/Classes';
import {TlogService} from '../../shared/Services/tlog.service';


@Component({
    selector: 'my-week',
    templateUrl: 'week.component.html'

})
export class WeekComponent implements OnInit {

    @Input() week: Week;
    @Input() weekindex: number;
    days: Day[] = [];
    constructor(private tlogService: TlogService) {

    }

    ngOnInit() {
        this.days = this.week.week;
    }

    getStyle(isWorkday: string) {
        if (isWorkday === 'work') {
          return 'white';
        }
    }

}

