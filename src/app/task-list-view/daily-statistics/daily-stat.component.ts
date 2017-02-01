import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'daily-stat',
    templateUrl: 'daily-stat.component.html',
    styleUrls: ['daily-stat.component.scss']
})
export class DailyStatComponent {

    constructor(private tlogService: TlogService) {

    }

    /**
     * Decides if the extra minutes this day are positive or not
     * @returns {boolean}
     */
    public isExtraMinPerDayPositive(): boolean {
        if (this.tlogService.dailyStat[0] >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
