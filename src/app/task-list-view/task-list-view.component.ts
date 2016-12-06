import {Component, OnInit, Input} from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-task-list-view',
    templateUrl: 'task-list-view.component.html'
})
export class TaskListViewComponent implements OnInit {

    selectedElement: string;
    // workDays: string[] = [];
    // sortedWorkDays: string[];
    // workDayBeans: any = [];


    constructor(private tlogService: TlogService, private router: Router) {
        this.selectedElement = this.tlogService.getSelectedDayOnTaskList();
    }

    ngOnInit() {
        try {
            this.tlogService.getAllDisplayedData();
            // this.getWorkDaysInMonth(this.tlogService.getSelectedYear(), this.tlogService.getSelectedMonth());
        } catch (exception) {
            console.log(exception);
        }
    }

    updateElement(newValue: string): void {
        this.tlogService.setSelectedDayOnTaskList(newValue);
        this.selectedElement = newValue;
        this.tlogService.getAllDisplayedData();
        // this.getStatistics();
        // this.tlogService.getListOfTasks();
    }

    // getStatistics(): void {
    //     let dailyStat: number[] = this.tlogService.getDailyStat();
    //     console.log('workdaybeans: ',this.workDayBeans);
    //     for (let index = 0; index < this.workDayBeans.length; index++) {
    //         if (this.selectedElement === this.workDayBeans[index].actualDay.toString()) {
    //             dailyStat[0] = this.workDayBeans[index].extraMinPerDay;
    //             dailyStat[1] = this.workDayBeans[index].sumPerDay;
    //             dailyStat[2] = this.workDayBeans[index].requiredMinPerDay;
    //         }
    //     }
    //     this.tlogService.setDailyStat(dailyStat);
    //
    // }
    //
    //
    // public getWorkDaysInMonth(year: number, month: number) {
    //     this.tlogService._getWorkDaysInMonth(year, month).subscribe(
    //         (data) => {
    //             this.workDayBeans = data;
    //             this.tlogService.setWorkDayBeans(this.workDayBeans);
    //             this.workDays = this.tlogService.getWorkDays();
    //             this.tlogService.setWorkDays(this.workDays);
    //             this.tlogService.refreshWorkDays();
    //             this.tlogService.setupWeek();
    //             this.sortedWorkDays = this.tlogService.getSortedDays();
    //             console.log(this.sortedWorkDays);
    //             let selectedDayOnTaskList = this.tlogService.getSelectedDayOnTaskList();
    //             if (selectedDayOnTaskList === '') {
    //                 selectedDayOnTaskList = this.sortedWorkDays[0];
    //                 this.tlogService.setSelectedDayOnTaskList(selectedDayOnTaskList);
    //             }
    //             this.selectedElement = selectedDayOnTaskList;
    //             this.getStatistics();
    //             this.tlogService.getListOfTasks();
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }
}
