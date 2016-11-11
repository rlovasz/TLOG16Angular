import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {TlogService} from '../../../../shared/services/tlog.service';

@Component({
    selector: 'my-workday-cell',
    templateUrl: 'workday-cell.component.html'
})
export class WorkdayCellComponent implements OnInit {
    @Input()
    dayindex: number;
    @Input()
    weekindex: number;
    minute: number = 420;

    constructor(private tlogService: TlogService, private router: Router) { }

    public getStyle() {
        if (this.minute >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    public ngOnInit() {

    }

    public gotoTaskListView(): void {
        this.router.navigate(['/tasklist']);
    }
}
