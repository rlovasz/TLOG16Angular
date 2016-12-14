import {Component, OnInit} from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'add-day-modal',
    templateUrl: 'add-day-modal.component.html'
})
export class AddDayModalComponent implements OnInit {
    private requiredMins: number;

    resetVal() {
        this.requiredMins = null;
    }

    constructor(private tlogService: TlogService, private router: Router) {
    }

    ngOnInit() {

    }

    addDay(requiredHours: number) {
        this.tlogService.addDayWeekday(requiredHours).subscribe(
            (data) => {

            },
            (err) => {
                if (err.status === 428) {
                    let __this = this;
                    bootbox.confirm({
                        title: 'Warning',
                        buttons: {
                            confirm: {
                                label: 'Yes'
                            },
                            cancel: {
                                label: 'No'
                            }
                        },
                        message: 'Are you sure you have a working day on weekend?',
                        callback: function (result) {
                            if (result) {
                                __this.tlogService.addDayWeekend(requiredHours).subscribe(
                                    (data) => {

                                    },
                                    (error) => {
                                        if (error.status === 403) {
                                            bootbox.alert({
                                                title: 'Warning',
                                                message: 'You can not have a work day in the future!'
                                            });
                                            __this.resetVal();
                                        }
                                        if (error.status === 449) {
                                            bootbox.alert({
                                                title: 'Warning',
                                                message: 'You can not have negative working hours!'
                                            });
                                            __this.resetVal();
                                        }
                                        if (error.status === undefined) {
                                            __this.tlogService.getAllDisplayedData();
                                            __this.resetVal();
                                        }
                                    }
                                );
                            }
                        }
                    });
                    this.resetVal();
                }
                if (err.status === 403) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'You can not have a work day in the future!'
                    });
                    this.resetVal();
                }
                if (err.status === 449) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'You can not have negative working hours!'
                    });
                    this.resetVal();
                }
                if (err.status === undefined) {
                    this.tlogService.getAllDisplayedData();
                    this.resetVal();
                }
            }
        );
    }


}
