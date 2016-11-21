import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'monthly-stat',
    templateUrl: 'monthly-stat.component.html'
})
export class MonthlyStatComponent implements OnInit {

    constructor(private tlogService: TlogService) {

    }

    ngOnInit() {

    }

    getExtraMinPerMonthStyle() {
        if (this.tlogService.getMonthlyStat()[0] >= 0) {
          return 'green';
        } else {
          return 'red';
        }
    }

}
