import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {TlogService} from '../../../../shared/services/tlog.service';

@Component({
    selector: 'my-workday-cell',
    templateUrl: 'workday-cell.component.html'
})
export class WorkdayCellComponent implements OnInit {
    @Input() dayindex: number;
    @Input() weekindex: number;
    minute: number = 420;
    selectedMonth: Date;
    dayTypeOfFirstDay: number;

    constructor(private tlogService: TlogService, private router: Router) { }

    public ngOnInit() {
        this.selectedMonth = this.tlogService.getSelectedMonth();
        this.dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
    }

    public getStyle() {
        if (this.minute >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    public gotoTaskListView(): void {
        this.router.navigate(['/tasklist']);
    }
}
