import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';


@Component({
    selector: 'add-day-modal',
    templateUrl: 'add-day-modal.component.html'
})
export class AddDayModalComponent implements OnInit {
    private requiredMins: number;


    resetVal() {
        this.requiredMins = null;
    }

    constructor(private tlogService: TlogService) {
    }

    ngOnInit() {

    }

    addDay(requiredHours: number) {
        this.tlogService.addDayWeekday(requiredHours).subscribe(
            (data) => {

            },
            (err) => {
                if (err.status === 428) {
                    if (confirm('Are you sure you have a working day on weekend?')) {
                        this.tlogService.addDayWeekend(requiredHours);
                    } else {
                        this.resetVal();
                    }
                }
                if (err.status === 403) {
                    alert('You can not have a work day in the future!');
                    this.resetVal();
                }
                if (err.status === 449) {
                    alert('You can not have negative working hours!');
                    this.resetVal();
                }
                if (err.status === undefined) {
                    window.location.reload();
                }
            }
        );
    }


}
