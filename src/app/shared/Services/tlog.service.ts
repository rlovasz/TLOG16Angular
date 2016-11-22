import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Week, WorkDayRB, Day, StartTaskRB, FinishingTaskRB, ModifyTaskRB, DeleteTaskRB} from '../Classes/Classes';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';


@Injectable()
export class TlogService {

    private selectedDate: any;
    private selectedMonth: number;
    private selectedYear: number;
    private monthDisplay: string;
    private dayTypeOfFirstDay: number;
    private dayTypeOfLastDay: number;
    private daysInMonth: number;
    private amountOfDisplayedCells: number = 0;
    private firstWeek: Week = new Week();
    private secondWeek: Week = new Week();
    private thirdWeek: Week = new Week();
    private fourthWeek: Week = new Week();
    private fifthWeek: Week = new Week();
    private sixthWeek: Week = new Week();
    private weeks: Week[] = [];
    private workDayBeans: any;
    private taskBeans: any;
    private workMonthBeans: any;
    private workDays: string[] = [];
    private tasks: any[] = [];
    private monthlyStat: number[] = [0, 0];
    private dailyStat: number[] = [0, 0, 0];
    private selectedDayOnTaskList: string = '';
    private workDaysNumberOfDay: number[] = [];
    private addedDay: number = 0;
    private editTaskId: string;
    private editComment: string;
    private editStartTime: string;
    private editEndTime: string;
    private deleteTaskId: string;
    private deleteStartTime: string;
    private workDayIndex: number = -1;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private router: Router) {
        this.selectedDate = new Date();

    }

    public sortFunction(a, b): number {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    public setupValues() {
        this.selectedMonth = this.selectedDate.getMonth() + 1;
        this.selectedYear = this.selectedDate.getFullYear();
        if (this.selectedMonth >= 10) {
            this.monthDisplay = this.selectedYear + '-' + this.selectedMonth;
        } else {
            this.monthDisplay = this.selectedYear + '-0' + this.selectedMonth;
        }
        this.daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
        this.dayTypeOfFirstDay = new Date(this.selectedYear, this.selectedMonth - 1, 0).getDay();
        this.dayTypeOfLastDay = new Date(this.selectedYear, this.selectedMonth - 1, this.daysInMonth - 1).getDay();
        this.amountOfDisplayedCells = this.dayTypeOfFirstDay + this.daysInMonth + 6 - this.dayTypeOfLastDay;
    }

    public clearLists() {
        this.weeks = [];
        this.firstWeek = new Week();
        this.secondWeek = new Week();
        this.thirdWeek = new Week();
        this.fourthWeek = new Week();
        this.fifthWeek = new Week();
        this.sixthWeek = new Week();
        this.workDays = [];
        this.workDaysNumberOfDay = [];
        this.workDayIndex = -1;
    }


    setupWeek() {
        for (let index = 0; index < 7; index++) {
            for (let workDay in this.workDaysNumberOfDay) {
                if (index >= this.dayTypeOfFirstDay && index + 1 - this.dayTypeOfFirstDay !== this.workDaysNumberOfDay[workDay]) {
                    this.firstWeek.week[index] = new Day('notempty');
                } else if (index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                    this.firstWeek.week[index] = new Day('work');
                    break;
                } else {
                    this.firstWeek.week[index] = new Day('empty');
                }
            }
        }
        for (let index = 0; index < 7; index++) {
            for (let workDay in this.workDaysNumberOfDay) {
                if (7 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                    this.secondWeek.week[index] = new Day('work');
                    break;
                } else {
                    this.secondWeek.week[index] = new Day('notempty');
                }

            }
        }
        for (let index = 0; index < 7; index++) {
            for (let workDay in this.workDaysNumberOfDay) {
                if (14 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                    this.thirdWeek.week[index] = new Day('work');
                    break;
                } else {
                    this.thirdWeek.week[index] = new Day('notempty');
                }
            }
        }
        for (let index = 0; index < 7; index++) {
            for (let workDay in this.workDaysNumberOfDay) {
                if (21 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                    this.fourthWeek.week[index] = new Day('work');
                    break;
                } else {
                    this.fourthWeek.week[index] = new Day('notempty');
                }
            }
        }

        if (this.amountOfDisplayedCells / 7 > 4) {
            if (this.amountOfDisplayedCells / 7 > 5) {
                for (let index = 0; index < 7; index++) {
                    for (let workDay in this.workDaysNumberOfDay) {
                        if (28 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                            this.fifthWeek.week[index] = new Day('work');
                            break;
                        } else {
                            this.fifthWeek.week[index] = new Day('notempty');
                        }
                    }
                }
                for (let index = 0; index < 7; index++) {
                    for (let workDay in this.workDaysNumberOfDay) {
                        if (index <= this.dayTypeOfLastDay
                            && 35 + index + 1 - this.dayTypeOfFirstDay !== this.workDaysNumberOfDay[workDay]) {
                            this.sixthWeek.week[index] = new Day('notempty');
                        } else if (35 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                            this.sixthWeek.week[index] = new Day('work');
                            break;
                        } else {
                            this.sixthWeek.week[index] = new Day('empty');
                        }
                    }
                }

            } else {
                for (let index = 0; index < 7; index++) {
                    for (let workDay = 0; workDay < this.workDaysNumberOfDay.length; workDay++) {
                        if (index > this.dayTypeOfLastDay) {
                            this.fifthWeek.week[index] = new Day('empty');
                        } else if (28 + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                            this.fifthWeek.week[index] = new Day('work');
                            break;
                        } else {
                            this.fifthWeek.week[index] = new Day('notempty');
                        }
                        this.weeks[4] = this.fifthWeek;
                    }
                }
            }
        }
        this.weeks[0] = this.firstWeek;
        this.weeks[1] = this.secondWeek;
        this.weeks[2] = this.thirdWeek;
        this.weeks[3] = this.fourthWeek;
        this.weeks[4] = this.fifthWeek;
        this.weeks[5] = this.sixthWeek;
    }

    refreshWorkDays() {
        this.workDaysNumberOfDay[0] = -this.dayTypeOfFirstDay;
        for (let index = 0; index < this.workDays.length; index++) {
            this.workDaysNumberOfDay[index] = +this.workDays[index].split('-')[2];
        }
    }

    public getWorkDaysInMonth(year: number, month: number) {
        this._getWorkDaysInMonth(year, month).subscribe(
            (data) => {
                this.workDayBeans = data;
                this.workDays = this.getWorkDays();
                this.refreshWorkDays();
                this.setupWeek();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public getWorkDays(): string[] {
        let workDays = [];
        for (let index = 0; index < this.workDayBeans.length; index++) {
            workDays[index] = this.workDayBeans[index].actualDay.toString();
        }
        return workDays;
    }

    public getSortedDays(): string[] {
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

    public getListOfTasks() {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        this._getTasksOnSpecificDay(year, month, day).subscribe(
            (data) => {
                this.taskBeans = data;
                this.getValues();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private getValues(): void {
        this.tasks = [];
        for (let index = 0; index < this.taskBeans.length; index++) {
            this.tasks[index] = [];
            this.tasks[index][0] = this.taskBeans[index].taskId.toString();
            this.tasks[index][1] = this.taskBeans[index].comment.toString();
            this.tasks[index][2] = this.taskBeans[index].startTime.toString();
            this.tasks[index][3] = this.taskBeans[index].endTime.toString();
            this.tasks[index][4] = +this.taskBeans[index].minPerTask.toString();
        }
    }

    getMonthlyStatistics(): number[] {
        let statistics = [];
        for (let index = 0; index < this.workMonthBeans.length; index++) {
            if (this.workMonthBeans[index].monthDate === this.monthDisplay) {
                statistics[0] = +this.workMonthBeans[index].extraMinPerMonth.toString();
                statistics[1] = +this.workMonthBeans[index].sumPerMonth.toString();
            }
            if (statistics.length === 0) {
                statistics[0] = 0;
                statistics[1] = 0;
            }
        }
        return statistics;
    }

    public getWorkMonthsForMonthlyStatistics() {
        this._getWorkMonths().subscribe(
            (data) => {
                this.setWorkMonthBeans(data);
                this.monthlyStat = this.getMonthlyStatistics();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public _getWorkDaysInMonth(year: number, month: number): Observable<any> {
        return this.http.get('http://127.0.0.1:9080/timelogger/workmonths/' + year + '/' + month).map((res: any) => res.json());
    }

    public _getWorkMonths(): Observable<any> {
        return this.http.get('http://127.0.0.1:9080/timelogger/workmonths').map((res: any) => res.json());
    }

    public _getTasksOnSpecificDay(year: number, month: number, day: number): Observable<any> {
        return this.http.get('http://127.0.0.1:9080/timelogger/workmonths/' + year + '/' + month + '/' + day).map((res: any) => res.json());
    }

    public addDayWeekday(requiredHours: number): Observable<any> {
        let workDayBean = new WorkDayRB(this.selectedYear, this.selectedMonth, this.addedDay, requiredHours);
        let workDay = JSON.stringify(workDayBean);
        return this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays', workDay, {headers: this.headers})
            .map((res: any) => res.json());
    }

    public addDayWeekend(requiredHours: number): void {
        let workDayBean = new WorkDayRB(this.selectedYear, this.selectedMonth, this.addedDay, requiredHours);
        let workDay = JSON.stringify(workDayBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/weekend', workDay, {headers: this.headers}).toPromise();
        this.router.navigate(['/tasklist']);
        setTimeout(() => this.router.navigate(['/calendar']), 10);
    }

    public addNewBasicTask(taskId: string, startTime: string): void {
        console.log(this.selectedDayOnTaskList);
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new StartTaskRB(year, month, day, taskId, '', startTime);
        let task = JSON.stringify(taskBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/start', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {

                },
                (err) => {
                    if (err.status === 417) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task should begin earlier then it ends!'
                        });
                    }
                    if (err.status === 406) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'This task id is not valid, valid id for erxample: 7856, LT-9635, ...'
                        });
                    }
                    if (err.status === 416) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The duration of the task should be multiple of the quarter hours!'
                        });
                    }
                    if (err.status === 409) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task has a common interval with an existing task, the intervals should be separated!'
                        });
                    }
                }
            );
        this.reloadData();
    }

    public addNewTaskWithComment(taskId: string, comment: string, startTime: string): void {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new StartTaskRB(year, month, day, taskId, comment, startTime);
        let task = JSON.stringify(taskBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/start', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {

                },
                (err) => {
                    if (err.status === 417) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task should begin earlier then it ends!'
                        });
                    }
                    if (err.status === 406) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'This task id is not valid, valid id for erxample: 7856, LT-9635, ...'
                        });
                    }
                    if (err.status === 416) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The duration of the task should be multiple of the quarter hours!'
                        });
                    }
                    if (err.status === 409) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task has a common interval with an existing task, the intervals should be separated!'
                        });
                    }
                }
            );
        this.reloadData();
    }


    public addNewFinishedTask(taskId: string, startTime: string, endTime: string): void {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new FinishingTaskRB(year, month, day, taskId, startTime, endTime);
        let task = JSON.stringify(taskBean);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/finish', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {

                },
                (err) => {
                    if (err.status === 417) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task should begin earlier then it ends!'
                        });
                    }
                    if (err.status === 406) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'This task id is not valid, valid id for erxample: 7856, LT-9635, ...'
                        });
                    }
                    if (err.status === 416) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The duration of the task should be multiple of the quarter hours!'
                        });
                    }
                    if (err.status === 409) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task has a common interval with an existing task, the intervals should be separated!'
                        });
                    }
                }
            );
        this.reloadData();
    }

    public addNewTask(taskId: string, comment: string, startTime: string, endTime: string): void {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new ModifyTaskRB(year, month, day, taskId, startTime, taskId, comment, startTime, endTime);
        let task = JSON.stringify(taskBean);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/modify', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                },
                (err) => {
                    if (err.status === 417) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task should begin earlier then it ends!'
                        });
                    }
                    if (err.status === 406) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'This task id is not valid, valid id for erxample: 7856, LT-9635, ...'
                        });
                    }
                    if (err.status === 416) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The duration of the task should be multiple of the quarter hours!'
                        });
                    }
                    if (err.status === 409) {
                        bootbox.alert({
                            title: 'Warning',
                            message: 'The task has a common interval with an existing task, the intervals should be separated!'
                        });
                    }
                }
            );
        this.reloadData();
    }

    public modifyTask(newTaskId: string, newComment: string, newStartTime: string, newEndTime: string): Observable<any> {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new ModifyTaskRB(year, month, day,
            this.editTaskId, this.editStartTime, newTaskId, newComment, newStartTime, newEndTime);
        let task = JSON.stringify(taskBean);
        console.log(task);        return this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/modify', task, {headers: this.headers})
            .map((res: Response) => res.json());
    }

    public deleteTask() {
        let year = +this.selectedDayOnTaskList.split('-')[0];
        let month = +this.selectedDayOnTaskList.split('-')[1];
        let day = +this.selectedDayOnTaskList.split('-')[2];
        let taskBean = new DeleteTaskRB(year, month, day, this.deleteTaskId, this.deleteStartTime);
        let task = JSON.stringify(taskBean);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/delete', task, {headers: this.headers}).toPromise();
        this.reloadData();
    }

    public reloadData() {
        this.router.navigate(['/calendar']);
        setTimeout(() => this.router.navigate(['/tasklist']), 10);
    }

    public getAddedDay(day: number) {
        this.addedDay = day;
    }

    public getWorkDayIndex(): number {
        return this.workDayIndex;
    }

    public setWorkDayIndex(newWorkDayIndex: number) {
        this.workDayIndex = newWorkDayIndex;
    }

    public setSelectedDayOnTaskList(newSelectedValue: string) {
        this.selectedDayOnTaskList = newSelectedValue;
    }

    public setWorkMonthBeans(newValue: any) {
        this.workMonthBeans = newValue;
    }

    public setWorkDays(newValue: string[]) {
        this.workDays = newValue;
    }

    public setSelectedDate(newValue: Date) {
        this.selectedDate = newValue;
    }

    public setEditTaskId(newValue: string) {
        this.editTaskId = newValue;
    }

    public setEditComment(newValue: string) {
        this.editComment = newValue;
    }

    public setEditStartTime(newValue: string) {
        this.editStartTime = newValue;
    }

    public setEditEndTime(newValue: string) {
        this.editEndTime = newValue;
    }

    public setDeleteTaskId(newValue: string) {
        this.deleteTaskId = newValue;
    }

    public setDeleteStartTime(newValue: string) {
        this.deleteStartTime = newValue;
    }

    public getDailyStat(): number[] {
        return this.dailyStat;
    }

    public getSelectedDayOnTaskList(): string {
        return this.selectedDayOnTaskList;
    }

    public getWorkDayBeans(): any {
        return this.workDayBeans;
    }

    public getTasks(): any[] {
        return this.tasks;
    }

    public getMonthlyStat(): number[] {
        return this.monthlyStat;
    }

    public getMonthDisplay(): string {
        return this.monthDisplay;
    }

    public getSelectedDate(): Date {
        return this.selectedDate;
    }

    public getSelectedYear(): number {
        return this.selectedYear;
    }

    public getSelectedMonth(): number {
        return this.selectedMonth;
    }

    public getDayTypeOfFirstDay(): number {
        return this.dayTypeOfFirstDay;
    }

    public  getWeeks(): Week[] {
        return this.weeks;
    }

    public getEditTaskId(): string {
        return this.editTaskId;
    }

    public getEditComment(): string {
        return this.editComment;
    }

    public getEditStartTime(): string {
        return this.editStartTime;
    }

    public getEditEndTime(): string {
        return this.editEndTime;
    }


}
