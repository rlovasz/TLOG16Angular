import {Component} from '@angular/core';
import {TlogService} from '../../shared/services/tlog.service';

@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html'
})
export class PagerComponent {
    constructor(private tlogService: TlogService) { }

    public prevClick() {
        // this.tlogService.selectedMonth.addMonths(-1);
        this.tlogService.selectedMonth.setMonth(this.tlogService.selectedMonth.getMonth() - 1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    }

    public nextClick() {
        // this.tlogService.selectedMonth.addMonths(1);
        this.tlogService.selectedMonth.setMonth(this.tlogService.selectedMonth.getMonth() + 1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    }
}

