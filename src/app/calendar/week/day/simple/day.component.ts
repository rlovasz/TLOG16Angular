import { Component, Input } from '@angular/core';
import {TlogService} from '../../../../shared/Services/tlog.service';

@Component({
    selector: 'my-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.scss']
})
/**
 * This component visualizes the simple days in the calendar
 */
export class DayComponent {
    @Input() public dayindex: number;
    @Input() public weekindex: number;

    constructor(private tlogService: TlogService) {

    }

}

