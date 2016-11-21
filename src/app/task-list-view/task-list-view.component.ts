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
        try {
            let workDayBeans = this.tlogService.getWorkDayBeans();
            let selectedDayOnTaskList = this.tlogService.getSelectedDayOnTaskList();
            this.workDaysBeans = workDayBeans;
            this.workDays = this.tlogService.getWorkDays();
            this.sortedWorkDays = this.tlogService.getSortedDays();
            if (selectedDayOnTaskList === '') {
                selectedDayOnTaskList = this.sortedWorkDays[0];
            }
            this.selectedElement = selectedDayOnTaskList;
            this.getStatistics();
            this.tlogService.getListOfTasks();
        } catch (exception) {
            this.router.navigate(['/calendar']);
            setTimeout(() => this.router.navigate(['/tasklist']), 1);
        }

    }

    updateElement(newValue: string): void {
        this.tlogService.setSelectedDayOnTaskList(newValue);
        this.selectedElement = newValue;
        this.getStatistics();
        this.tlogService.getListOfTasks();
    }

    getStatistics(): void {
        let dailyStat: number[] = this.tlogService.getDailyStat();
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            if (this.selectedElement === this.workDaysBeans[index].actualDay.toString()) {
                dailyStat[0] = this.workDaysBeans[index].extraMinPerDay;
                dailyStat[1] = this.workDaysBeans[index].sumPerDay;
                dailyStat[2] = this.workDaysBeans[index].requiredMinPerDay;
            }
        }

    }






}
