import {Component, Input, OnInit} from '@angular/core';
import {TlogService} from '../../../../shared/services/tlog.service';

@Component({
    selector: 'my-day',
    templateUrl: 'day.component.html'
})
export class DayComponent implements OnInit {
    @Input() dayindex: number;
    @Input() weekindex: number;
    dayTypeOfFirstDay: number;
    selectedMonth: Date;

    ngOnInit(): void {
        this.dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
        this.selectedMonth = this.tlogService.getSelectedMonth();
    }

    constructor(private tlogService: TlogService) { }

}

