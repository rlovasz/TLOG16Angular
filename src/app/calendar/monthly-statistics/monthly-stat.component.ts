import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'monthly-stat',
    templateUrl: 'monthly-stat.component.html',
    styleUrls: ['monthly-stat.component.scss']
})
export class MonthlyStatComponent {

    constructor(private tlogService: TlogService) {

    }

    /**
     * Decides if the extra minutes this month are positive or not
     * @returns {boolean}
     */
    public isExtraMinPerMonthPositive(): boolean {
        if (this.tlogService.monthlyStat[0] >= 0) {
          return true;
        } else {
          return false;
        }
    }

}
