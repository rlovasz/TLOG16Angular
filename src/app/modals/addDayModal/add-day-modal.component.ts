import {Component, OnInit} from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';
import {Router} from "@angular/router";


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
                    let _this = this;
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
                                _this.tlogService.addDayWeekend(requiredHours).subscribe(
                                    (data) => {

                                    },
                                    (err) => {
                                        if (err.status === 403) {
                                            bootbox.alert({
                                                title: 'Warning',
                                                message: 'You can not have a work day in the future!'
                                            });
                                            _this.resetVal();
                                        }
                                        if (err.status === 449) {
                                            bootbox.alert({
                                                title: 'Warning',
                                                message: 'You can not have negative working hours!'
                                            });
                                            _this.resetVal();
                                        }
                                        if (err.status === undefined) {
                                            _this.tlogService.getAllDisplayedData();
                                            _this.resetVal();
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
