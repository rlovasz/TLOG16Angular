import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'daily-stat',
    templateUrl: 'daily-stat.component.html'
})
export class DailyStatComponent implements OnInit {
    
    constructor(private tlogService: TlogService) {
    }

    ngOnInit() { }

    getExtraMinPerDayStyle() {
        if (this.tlogService.getDailyStat()[0] >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }
}
