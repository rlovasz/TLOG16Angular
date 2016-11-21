import { Component, OnInit, Input } from '@angular/core';
import {TlogService} from '../../../../shared/Services/tlog.service';

@Component({
    selector: 'my-day',
    templateUrl: 'day.component.html'
})
export class DayComponent implements OnInit {
    @Input() dayindex: number;
    @Input() weekindex: number;
    constructor(private tlogService: TlogService) { }

    ngOnInit() {
    }


}

