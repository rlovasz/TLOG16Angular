import {Component, Input} from '@angular/core';
import {TlogService} from '../../../../shared/services/tlog.service';

@Component({
    selector: 'my-day',
    templateUrl: 'day.component.html'
})
export class DayComponent {
    @Input() dayindex: number;
    @Input() weekindex: number;

    constructor(private tlogService: TlogService) { }

}

