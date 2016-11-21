import {Component, OnInit} from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-task-list-view',
    templateUrl: 'task-list-view.component.html'
})
export class TaskListViewComponent implements OnInit {


    selectedElement: string;
    workDays: string[] = [];
    sortedWorkDays: string[];
    workDaysBeans: any = [];


    constructor(private tlogService: TlogService, private router: Router) {

    }

    ngOnInit() {
        // this.getWorkDaysThisMonth(this.tlogService.selectedYear, this.tlogService.selectedMonth);
        try {
            this.workDaysBeans = this.tlogService.workDaysBeans;
            console.log(this.workDaysBeans);
            this.workDays = this.getWorkDays();
            console.log(this.workDays);
            this.sortedWorkDays = this.getSortedDays();
            console.log(this.sortedWorkDays);
            if (this.tlogService.selectedElement === '') {
                this.tlogService.selectedElement = this.sortedWorkDays[0];
            }
            this.selectedElement = this.tlogService.selectedElement;
            console.log(this.selectedElement);
            this.getStatistics();
            this.tlogService.getListOfTasks();
        } catch (exception) {
            console.log(exception);
            this.router.navigate(['/calendar']);
            console.log(this.selectedElement);
            setTimeout(() => this.router.navigate(['/tasklist']), 1);
        }

    }

    getWorkDaysThisMonth(year: number, month: number) {
        this.tlogService._getWorkDaysInMonth(year, month).subscribe(
            (data) => {
                this.workDaysBeans = data;
                console.log(this.workDaysBeans);
                this.workDays = this.getWorkDays();
                console.log(this.workDays);
                this.sortedWorkDays = this.getSortedDays();
                console.log(this.sortedWorkDays);
                this.tlogService.selectedElement = this.sortedWorkDays[0];
                this.selectedElement = this.tlogService.selectedElement;
                console.log(this.selectedElement);
                this.getStatistics();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getWorkDays(): string[] {
        let workDays = [];
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            workDays[index] = this.workDaysBeans[index].actualDay.toString();
        }
        return workDays;
    }

    updateElement(newValue: string): void {
        this.tlogService.selectedElement = newValue;
        this.selectedElement = newValue;
        this.getStatistics();
        this.tlogService.getListOfTasks();
    }

    getStatistics(): void {
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            if (this.selectedElement === this.workDaysBeans[index].actualDay.toString()) {
                this.tlogService.extraMinutesPerDay = this.workDaysBeans[index].extraMinPerDay;
                this.tlogService.sumOfMinutesPerDay = this.workDaysBeans[index].sumPerDay;
                this.tlogService.requiredMinutesPerDay = this.workDaysBeans[index].requiredMinPerDay;
                console.log(this.tlogService.requiredMinutesPerDay);
            }
        }

    }

    getSortedDays(): string[] {
        let dateAndDay = [];
        let workDays = [];
        for (let index = 0; index < this.workDays.length; index++) {
            dateAndDay[index] = [];
            dateAndDay[index][1] = this.workDays[index];
            dateAndDay[index][0] = +this.workDays[index].split('-')[2];
        }
        dateAndDay.sort(this.sortFunction);
        for (let index = 0; index < this.workDays.length; index++) {
            workDays[index] = dateAndDay[index][1];
        }
        return workDays;
    }

    sortFunction(a, b): number {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }


}
