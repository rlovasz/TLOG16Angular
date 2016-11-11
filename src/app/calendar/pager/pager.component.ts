import {Component, OnInit} from '@angular/core';
import {TlogService} from '../../shared/services/tlog.service';


declare var datejs: any;
@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html'
})

export class PagerComponent implements OnInit {

    selectedMonth: Date = new Date();
    displayMonth: string;

    constructor(private tlogService: TlogService) { }

    ngOnInit(): void {
        this.selectedMonth = this.tlogService.getSelectedMonth();
        this.displayMonth = this.tlogService.getDisplayMonth();
    }

    public prevClick() {
        // this.selectedMonth.addMonths(-1);
        this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1);
        this.tlogService.clearLists();
        this.tlogService.setSelectedMonth(this.selectedMonth);
        this.tlogService.setupValues();
        this.displayMonth = this.tlogService.getDisplayMonth();
    }

    public nextClick() {
        // this.selectedMonth.addMonths(1);
        this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1);
        this.tlogService.clearLists();
        this.tlogService.setSelectedMonth(this.selectedMonth);
        this.tlogService.setupValues();
        this.displayMonth = this.tlogService.getDisplayMonth();
    }
}

