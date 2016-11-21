import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Week, WorkDayRB, Day, StartTaskRB, FinishingTaskRB, ModifyTaskRB, DeleteTaskRB} from '../Classes/Classes';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';


@Injectable()
export class TlogService {

    selectedDate: any;
    selectedMonth: number;
    selectedYear: number;
    month: string;
    dayTypeOfFirstDay: number;
    dayTypeOfLastDay: number;
    daysInMonth: number;
    i: number = 0;
    firstWeek: Week = new Week();
    secondWeek: Week = new Week();
    thirdWeek: Week = new Week();
    fourthWeek: Week = new Week();
    fifthWeek: Week = new Week();
    sixthWeek: Week = new Week();
    private weeks: Week[] = [];
    workDaysBeans: any;
    taskBeans: any;
    workMonthsBeans: any;
    workDays: string[] = [];
    tasks: any[] = [];
    monthlyStat: number[] = [0, 0];
    extraMinutesPerDay: number;
    sumOfMinutesPerDay: number;
    requiredMinutesPerDay: number;
    selectedElement: string = '';
    private workDaysNumberOfDay: number[] = [];
    lastClickedButton: number = 0;
    editTaskId: string;
    editComment: string;
    editStartTime: string;
    editEndTime: string;
    deleteTaskId: string;
    deleteStartTime: string;
    private workDayIndex: number = -1;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private router: Router) {
        this.selectedDate = new Date();

    }

    setupValues() {
        this.selectedMonth = this.selectedDate.getMonth() + 1;
        this.selectedYear = this.selectedDate.getFullYear();
        this.month = this.selectedYear + '-' + this.selectedMonth;
        this.daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
        this.dayTypeOfFirstDay = new Date(this.selectedYear, this.selectedMonth - 1, 0).getDay();
        this.dayTypeOfLastDay = new Date(this.selectedYear, this.selectedMonth - 1, this.daysInMonth - 1).getDay();
        this.i = this.dayTypeOfFirstDay + this.daysInMonth + 6 - this.dayTypeOfLastDay;
    }

    clearLists() {
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

    getWorkDays(): string[] {
        let workDays = [];
        for (let index = 0; index < this.workDaysBeans.length; index++) {
            workDays[index] = this.workDaysBeans[index].actualDay.toString();
        }
        return workDays;
    }

    getMonthlyStatistics(): number[] {
        let statistics = [];
        for (let index = 0; index < this.workMonthsBeans.length; index++) {
            if (this.workMonthsBeans[index].monthDate === this.month) {
                statistics[0] = +this.workMonthsBeans[index].extraMinPerMonth.toString();
                statistics[1] = +this.workMonthsBeans[index].sumPerMonth.toString();
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
                this.workMonthsBeans = data;
                this.monthlyStat = this.getMonthlyStatistics();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public getWorkDaysInMonth(year: number, month: number) {
        this._getWorkDaysInMonth(year, month).subscribe(
            (data) => {
                this.workDaysBeans = data;
                this.workDays = this.getWorkDays();
                this.refreshWorkDays();
                this.setupWeek();
            },
            (error) => {
                console.log(error);
            }
        );
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

        if (this.i / 7 > 4) {
            if (this.i / 7 > 5) {
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

    public getLastClickedButton(day: number) {
        this.lastClickedButton = day;
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
        let workDayBean = new WorkDayRB(this.selectedYear, this.selectedMonth, this.lastClickedButton, requiredHours);
        let workDay = JSON.stringify(workDayBean);
        return this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays', workDay, {headers: this.headers})
            .map((res: any) => res.json());


    }

    public addDayWeekend(requiredHours: number): void {
        let workDayBean = new WorkDayRB(this.selectedYear, this.selectedMonth, this.lastClickedButton, requiredHours);
        let workDay = JSON.stringify(workDayBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/weekend', workDay, {headers: this.headers}).toPromise();
        window.location.reload();

    }

    public addNewBasicTask(taskId: string, startTime: string): void {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        let taskBean = new StartTaskRB(year, month, day, taskId, '', startTime);
        let task = JSON.stringify(taskBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/start', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                    console.log(data.status);
                    console.log(task);
                },
                (err) => {
                    console.log(err.status);
                    console.log(task);

                    if (err.status === 417) {
                        alert('The task should begin earlier then it ends!');
                    }
                    if (err.status === 406) {
                        alert('This task id is not valid, valid id for erxample: 7856, LT-9635, ...');
                    }
                    if (err.status === 416) {
                        alert('The duration of the task should be multiple of the quarter hours!');
                    }
                    if (err.status === 409) {
                        alert('The task has a common interval with an existing task, the intervals should be separated!');
                    }
                }
            );
        this.reloadData();
    }

    reloadData() {
        this.router.navigate(['/calendar']);
        setTimeout(() => this.router.navigate(['/tasklist']), 1);
        console.log('volt reload data');
    }

    public addNewTaskWithComment(taskId: string, comment: string, startTime: string): void {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        let taskBean = new StartTaskRB(year, month, day, taskId, comment, startTime);
        let task = JSON.stringify(taskBean);
        this.http.post('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/start', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                    console.log(data.status);
                    console.log(task);

                    window.location.reload();
                },
                (err) => {
                    console.log(err.status);
                    console.log(task);
                    if (err.status === 417) {
                        alert('The task should begin earlier then it ends!');
                    }
                    if (err.status === 406) {
                        alert('This task id is not valid, valid id for erxample: 7856, LT-9635, ...');
                    }
                    if (err.status === 416) {
                        alert('The duration of the task should be multiple of the quarter hours!');
                    }
                    if (err.status === 409) {
                        alert('The task has a common interval with an existing task, the intervals should be separated!');
                    }
                }
            );
        this.reloadData();
    }


    public addNewFinishedTask(taskId: string, startTime: string, endTime: string): void {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        let taskBean = new FinishingTaskRB(year, month, day, taskId, startTime, endTime);
        let task = JSON.stringify(taskBean);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/finish', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                    console.log(data.status);
                    console.log(task);

                    window.location.reload();
                },
                (err) => {
                    console.log(err.status);
                    console.log(task);

                    if (err.status === 417) {
                        alert('The task should begin earlier then it ends!');
                    }
                    if (err.status === 406) {
                        alert('This task id is not valid, valid id for erxample: 7856, LT-9635, ...');
                    }
                    if (err.status === 416) {
                        alert('The duration of the task should be multiple of the quarter hours!');
                    }
                    if (err.status === 409) {
                        alert('The task has a common interval with an existing task, the intervals should be separated!');
                    }
                }
            );
        this.reloadData();
    }

    public addNewTask(taskId: string, comment: string, startTime: string, endTime: string): void {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        let taskBean = new ModifyTaskRB(year, month, day, taskId, startTime, taskId, comment, startTime, endTime);
        let task = JSON.stringify(taskBean);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/modify', task, {headers: this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                    console.log(data.status);
                    console.log(task);

                    window.location.reload();
                },
                (err) => {
                    console.log(err.status);
                    console.log(task);
                    console.log(err);
                    if (err.status === 417) {
                        alert('The task should begin earlier then it ends!');
                    }
                    if (err.status === 406) {
                        alert('This task id is not valid, valid id for erxample: 7856, LT-9635, ...');
                    }
                    if (err.status === 416) {
                        alert('The duration of the task should be multiple of the quarter hours!');
                    }
                    if (err.status === 409) {
                        alert('The task has a common interval with an existing task, the intervals should be separated!');
                    }
                }
            );
        this.reloadData();
    }

    public modifyTask(newTaskId: string, newComment: string, newStartTime: string, newEndTime: string): Observable<any> {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        let taskBean = new ModifyTaskRB(year, month, day,
            this.editTaskId, this.editStartTime, newTaskId, newComment, newStartTime, newEndTime);
        let task = JSON.stringify(taskBean);
        return this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/modify', task, {headers: this.headers})
            .map((res: Response) => res.json());
    }

    public deleteTask() {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
        console.log(this.deleteTaskId);
        console.log(this.deleteStartTime);
        let taskBean = new DeleteTaskRB(year, month, day, this.deleteTaskId, this.deleteStartTime);
        let task = JSON.stringify(taskBean);
        console.log(task);
        this.http.put('http://127.0.0.1:9080/timelogger/workmonths/workdays/tasks/delete', task, {headers: this.headers}).toPromise();
        this.reloadData();
    }

    public getListOfTasks() {
        let year = +this.selectedElement.split('-')[0];
        let month = +this.selectedElement.split('-')[1];
        let day = +this.selectedElement.split('-')[2];
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

    getValues(): void {
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

    getWorkDayIndex(): number {
        return this.workDayIndex;
    }

    setWorkDayIndex(newWorkDayIndex: number) {
        this.workDayIndex = newWorkDayIndex;
    }

}
