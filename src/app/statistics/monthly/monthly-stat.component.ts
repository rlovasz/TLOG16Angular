import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'monthly-stat',
    templateUrl: 'monthly-stat.component.html'
})
export class MonthlyStatComponent implements OnInit {

    getStyle() {
        if (this.tlogService.monthlyStat[0] >= 0) {
          return 'green';
        } else {
          return 'red';
        }
    }

    constructor(private tlogService: TlogService) { }

    ngOnInit() { }

}
