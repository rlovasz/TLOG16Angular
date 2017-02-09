import { Component } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html',
    styleUrls: ['pager.component.scss']
})
/**
 * This component accomplishes the paging operations
 */
export class PagerComponent {

    constructor(private tlogService: TlogService) {

    }

    /**
     *This method moves the actual displayed month into the previous one, this will calculate all the needed values to display the month
     */
    public prevClick(): void {
        this.paging(-1);
    }

    /**
     * This method moves the actual displayed month into the next one, this will calculate all the needed values to display the month
     */
    public nextClick(): void {
        this.paging(1);
    }

    private paging(pagedMonths: number): void {
        let selectedDate: Date = this.tlogService.selectedDate;
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + pagedMonths, 1);
        this.tlogService.selectedDate = selectedDate;
        this.tlogService.getAllDisplayedData();
    }
}

