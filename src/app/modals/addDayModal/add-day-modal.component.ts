import { Component } from '@angular/core';
import { TlogService } from '../../shared/Services/tlog.service';
import { Router } from '@angular/router';


@Component({
    selector: 'add-day-modal',
    templateUrl: 'add-day-modal.component.html',
    styleUrls: ['../modals.scss']
})
/**
 * This component contains a modal which comes up when a new day will be added
 */
export class AddDayModalComponent {
    private requiredMins: number;

    constructor(private tlogService: TlogService, private router: Router) {

    }

    /**
     * Resets the value of the required minutes input box
     */
    public resetVal(): void {
        this.requiredMins = null;
    }

    private errorSubscribe(errorStatus: number): void {
        if (errorStatus === 403) {
            this.tlogService.sendAlert('<p i18n="future alert">You can not have a work day in the future!</p>');
            this.resetVal();
        }
        if (errorStatus === 449) {
            this.tlogService.sendAlert('<p i18n="negative hours alert">You can not have negative working hours!</p>');
            this.resetVal();
        }
        if (errorStatus === undefined) {
            this.tlogService.getAllDisplayedData();
            this.resetVal();
        }
    }

    /**
     * This method does the whole process if the user wants to create a new day
     * @param requiredHours the required working hours this day
     */
    public addDay(requiredHours: number): void {
        this.tlogService.addDayWeekdayOnBackend(requiredHours).subscribe(
            (data) => {
            },
            (err) => {
                this.handleWeekendError(err.status, requiredHours);
                this.errorSubscribe(err.status);
            }
        );
    }

    private handleWeekendError(errorStatus: number, requiredHours: number) {
        if (errorStatus === 428) {
            bootbox.confirm({
                title: '<p i18n>Warning</p>',
                buttons: {
                    confirm: {
                        label: '<p i18n>Yes</p>'
                    },
                    cancel: {
                        label: '<p i18n>No</p>'
                    }
                },
                message: '<p i18n="weekend-confirm">Are you sure you have a working day on weekend?</p>',
                callback: (result) => {
                    this.addWeekendDayCallback(result, requiredHours);
                }
            });
            this.resetVal();
        }
    }

    private addWeekendDayCallback(result: boolean, requiredHours: number) {
        if (result) {
            this.tlogService.addDayWeekendOnBackend(requiredHours).subscribe(
                (data) => {

                },
                (error) => {
                    this.errorSubscribe(error.status);
                }
            );
        }
    }

}
