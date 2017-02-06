import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {
    Week,
    WorkDayRB,
    Day,
    Task,
    StartTaskRB,
    ModifyTaskRB,
    DeleteTaskRB,
    UserRB,
    WorkDay,
    WorkMonth
} from '../Classes/Classes';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';

/**
 * This service gives the data for the components and gets some data from the components
 */
@Injectable()
export class TlogService {


    private _selectedDate: any;
    private _selectedMonth: number;
    private _selectedYear: number;

    private dayTypeOfFirstDay: number;
    private dayTypeOfLastDay: number;
    private daysInMonth: number;
    private amountOfDisplayedCells: number = 0;
    private workDays: string[] = [];
    private workDaysNumberOfDay: number[] = [];
    private _addedDay: number = 0;
    private _editTaskId: string;
    private _editComment: string;
    private _editStartTime: string;
    private _editEndTime: string;
    private _deleteTaskId: string;
    private _deleteStartTime: string;
    private _workDayIndex: number = -1;
    private _jwtToken: string;
    private _loggedIn: boolean = false;
    private _headers;
    private backendUrl: string = 'http://127.0.0.1:9080/timelogger';

    private _sortedWorkDays: string[] = [];
    private _selectedDayOnTaskList: string = '';
    private yearOfSelectedDayOnTaskList: number;
    private monthOfSelectedDayOnTaskList: number;
    private dayOfSelectedDayOnTaskList: number;
    private _monthlyStat: number[] = [0, 0];
    private _dailyStat: number[] = [0, 0, 0];
    private _monthDisplay: string;
    private _tasks: Array<Task>;
    private _weeks: Week[] = [];
    private _tokenRefreshIntervalInMillis: number = 240000;

    /**
     * This method helps with sorting
     * @param a
     * @param b
     * @returns {number}
     */
    public static sortFunction(a, b): number {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    constructor(private http: Http, private router: Router) {
        this._selectedDate = new Date();
        this._headers = new Headers({'Content-Type': 'application/json'});
        this.getAllDisplayedData();
    }

    get selectedDate(): any {
        return this._selectedDate;
    }

    get tokenRefreshIntervalInMillis(): number {
        return this._tokenRefreshIntervalInMillis;
    }

    get selectedMonth(): number {
        return this._selectedMonth;
    }

    get selectedYear(): number {
        return this._selectedYear;
    }

    get editTaskId(): string {
        return this._editTaskId;
    }

    get editComment(): string {
        return this._editComment;
    }

    get editStartTime(): string {
        return this._editStartTime;
    }

    get editEndTime(): string {
        return this._editEndTime;
    }

    get workDayIndex(): number {
        return this._workDayIndex;
    }

    get jwtToken(): string {
        return this._jwtToken;
    }

    get loggedIn(): boolean {
        return this._loggedIn;
    }

    get sortedWorkDays(): string[] {
        return this._sortedWorkDays;
    }

    get selectedDayOnTaskList(): string {
        return this._selectedDayOnTaskList;
    }

    get monthlyStat(): number[] {
        return this._monthlyStat;
    }

    get dailyStat(): number[] {
        return this._dailyStat;
    }

    get monthDisplay(): string {
        return this._monthDisplay;
    }

    get tasks(): Array<Task> {
        return this._tasks;
    }

    get weeks(): Week[] {
        return this._weeks;
    }

    set selectedDate(value: any) {
        this._selectedDate = value;
    }

    set addedDay(value: number) {
        this._addedDay = value;
    }

    set editTaskId(value: string) {
        this._editTaskId = value;
    }

    set editComment(value: string) {
        this._editComment = value;
    }

    set editStartTime(value: string) {
        this._editStartTime = value;
    }

    set editEndTime(value: string) {
        this._editEndTime = value;
    }

    set deleteTaskId(value: string) {
        this._deleteTaskId = value;
    }

    set deleteStartTime(value: string) {
        this._deleteStartTime = value;
    }

    set workDayIndex(value: number) {
        this._workDayIndex = value;
    }

    set jwtToken(value: string) {
        this._jwtToken = value;
    }

    set loggedIn(value: boolean) {
        this._loggedIn = value;
    }

    set headers(value) {
        this._headers = value;
    }

    set monthlyStat(value: number[]) {
        this._monthlyStat = value;
    }

    set selectedDayOnTaskList(value: string) {
        this._selectedDayOnTaskList = value;
    }

    /**
     * This method displays an alert with the given message
     * @param message
     */
    public sendAlert(message: string) {
        bootbox.alert({
            title: '<p i18n>Warning</p>',
            message: message
        });
    }

    /**
     * Setup some values based on the information of the selected month
     */
    public setupValues(): void {
        this._selectedMonth = this._selectedDate.getMonth() + 1;
        this._selectedYear = this._selectedDate.getFullYear();
        this._monthDisplay = `${this._selectedYear}-${('00' + this._selectedMonth).substr(-2)}`;
        this.daysInMonth = new Date(this._selectedYear, this._selectedMonth, 0).getDate();
        this.dayTypeOfFirstDay = new Date(this._selectedYear, this._selectedMonth - 1, 0).getDay();
        this.dayTypeOfLastDay = new Date(this._selectedYear, this._selectedMonth - 1, this.daysInMonth - 1).getDay();
        this.amountOfDisplayedCells = this.dayTypeOfFirstDay + this.daysInMonth + 6 - this.dayTypeOfLastDay;
    }

    /**
     * Resets some basic values
     */
    public resetValues(): void {
        this._weeks = [];
        this._weeks[0] = new Week();
        this._weeks[1] = new Week();
        this._weeks[2] = new Week();
        this._weeks[3] = new Week();
        this._weeks[4] = new Week();
        this._weeks[5] = new Week();
        this.workDays = [];
        this.workDaysNumberOfDay = [];
        this._workDayIndex = -1;
    }

    /**
     * This method refreshes the list of the work days
     */
    public refreshWorkDays(): void {
        this.workDaysNumberOfDay[0] = -this.dayTypeOfFirstDay;
        for (let index = 0; index < this.workDays.length; index++) {
            this.workDaysNumberOfDay[index] = +this.workDays[index].split('-')[2];
        }
    }

    /**
     * This method collects the actual day values of the work days in the month
     * @param workMonths the json response of the backend call contains workmonths and all their informations
     * @returns {string[]}
     */
    public getWorkDaysActualDay(workMonths: Array<WorkMonth>): string[] {
        let workDays: Array<WorkDay> = this.getWorkDays(workMonths);
        let actualDays: string[] = [];
        if (workDays) {
            for (let i = 0; i < workDays.length; i++) {
                actualDays[i] = workDays[i].actualDay.toString();
            }
        }
        return actualDays;
    }

    /**
     *This method sorts the actualDay strings in one month
     * @returns {string[]}
     */
    public getSortedDays(): string[] {
        let dateAndDay: any[] = [];
        let workDays: string[] = [];
        for (let index = 0; index < this.workDays.length; index++) {
            dateAndDay[index] = [];
            dateAndDay[index][1] = this.workDays[index];
            dateAndDay[index][0] = +this.workDays[index].split('-')[2];
        }
        dateAndDay.sort(TlogService.sortFunction);
        for (let index = 0; index < this.workDays.length; index++) {
            workDays[index] = dateAndDay[index][1];
        }
        return workDays;
    }

    /**
     * This method calculates all the data to display the months and tasklists properly
     */
    public getAllDisplayedData(): void {
        this.fetchWorkMonthsFromBackend().subscribe(
            (workMonths) => {
                this.loggedIn = true;
                this.resetValues();
                this.setupValues();
                this.workDays = this.getWorkDaysActualDay(workMonths);
                this._sortedWorkDays = this.getSortedDays();
                if (this._selectedDayOnTaskList === '') {
                    this._selectedDayOnTaskList = this._sortedWorkDays[0];
                }
                this.monthlyStat = this.getMonthlyStatistics(workMonths);
                this.refreshWorkDays();
                this.setupWeeks();
                this.setupDailyStatAndTasksFromMonths(workMonths);
            },
            (err) => {
                if (err.status === 401) {
                    this.router.navigate(['/login']);
                }
            }
        );
    }

    /**
     * This method refreshes the JWT with a backend call
     */
    public refreshToken(): void {
        this.refreshTokenFromBackend().subscribe(
            (data) => {
                this.jwtToken = data.headers.get('Authorization').split(' ')[1];
                let header: Headers = new Headers({'Content-Type': 'application/json', 'Authorization': data.headers.get('Authorization')});
                this.headers = header;
                localStorage.removeItem('token');
                localStorage.setItem('token', this.jwtToken);
            }
        );
    }

    /**
     * This backend call fetches all the informations about the given month
     * @param year
     * @param month
     * @returns {Observable<R>}
     */
    public fetchWorkDaysInMonthFromBackend(year: number, month: number): Observable<Array<WorkDay>> {
        let header: Headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')});
        this.headers = header;
        return this.http.get(this.backendUrl + '/workmonths/' + year + '/' + month, {headers: this._headers} )
            .map((res) => <Array<WorkDay>> res.json());
    }

    /**
     * This backend call fetches all the informations about a given user
     * @returns {Observable<R>}
     */
    public fetchWorkMonthsFromBackend(): Observable<Array<WorkMonth>> {
        let header: Headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')});
        this.headers = header;
        return this.http.get(this.backendUrl + '/workmonths', {headers: this._headers}).map((res) => <Array<WorkMonth>> res.json());
    }

    /**
     * This backend call sends a request to the backend to login the given user
     * @param name
     * @param password
     * @returns {Observable<R>}
     */
    public loginUserInBackend(name: string, password: string): Observable<Response> {
        let userBean: UserRB = new UserRB(name, password);
        let user: string = JSON.stringify(userBean);
        return this.http.post(this.backendUrl + '/login', user, {headers: this._headers})
            .map((res: Response) => res);
    }

    /**
     * This backend call sends a request to the backend to register the given user
     * @param name
     * @param password
     * @returns {Observable<R>}
     */
    public registerUserInBackend(name: string, password: string): Observable<Response> {
        let header: Headers = new Headers({'Content-Type': 'application/json'});
        let userBean: UserRB = new UserRB(name, password);
        let user: string = JSON.stringify(userBean);
        return this.http.post(this.backendUrl + '/register', user, {headers: header})
            .map((res: Response) => res.json());
    }

    /**
     * This method creates a new work day on a weekday
     * @param requiredHours
     * @returns {Observable<any>}
     */
    public addDayWeekdayOnBackend(requiredHours: number): Observable<Response> {
        return this.addDayHelper(requiredHours, '/workmonths/workdays');
    }

    /**
     * This method creates a new work day ona weekend day
     * @param requiredHours
     * @returns {Observable<any>}
     */
    public addDayWeekendOnBackend(requiredHours: number): Observable<Response> {
        return this.addDayHelper(requiredHours, '/workmonths/workdays/weekend');
    }

    /**
     * This method creates a new task with the given informations
     * @param taskId
     * @param comment
     * @param startTime
     */
    public addNewBasicTaskWithOptionalCommentOnBackend(taskId: string, startTime: string, comment?: string): void {
        this.getYearMonthAndDayFromSelectedDayOnTaskList();
        let taskBean: StartTaskRB = new StartTaskRB(
            this.yearOfSelectedDayOnTaskList,
            this.monthOfSelectedDayOnTaskList,
            this.dayOfSelectedDayOnTaskList,
            taskId,
            comment || '',
            startTime
        );
        let task: string = JSON.stringify(taskBean);
        this.http.post(this.backendUrl + '/workmonths/workdays/tasks/start', task, {headers: this._headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                },
                (err) => {
                    this.addTaskSubscribe(err.status);
                }
            );
    }

    /**
     * This method creates a new task with the given informations
     * @param taskId
     * @param comment
     * @param startTime
     * @param endTime
     */
    public addNewFinishedTaskWithOptionalCommentOnBackend(taskId: string, startTime: string, endTime: string, comment?: string): void {
        this.getYearMonthAndDayFromSelectedDayOnTaskList();
        let taskBean: ModifyTaskRB = new ModifyTaskRB(
            this.yearOfSelectedDayOnTaskList,
            this.monthOfSelectedDayOnTaskList,
            this.dayOfSelectedDayOnTaskList,
            taskId,
            startTime,
            taskId,
            comment || '',
            startTime,
            endTime
        );
        let task: string = JSON.stringify(taskBean);
        this.http.put(this.backendUrl + '/workmonths/workdays/tasks/modify', task, {headers: this._headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                },
                (err) => {
                    this.addTaskSubscribe(err.status);
                }
            );
    }

    /**
     * This method will modify a selected task with the given values
     * @param newTaskId
     * @param newComment
     * @param newStartTime
     * @param newEndTime
     * @returns {Observable<R>}
     */
    public modifyTaskOnBackend(newTaskId: string, newComment: string, newStartTime: string, newEndTime: string): Observable<any> {
        this.getYearMonthAndDayFromSelectedDayOnTaskList();
        let taskBean: ModifyTaskRB = new ModifyTaskRB(
            this.yearOfSelectedDayOnTaskList,
            this.monthOfSelectedDayOnTaskList,
            this.dayOfSelectedDayOnTaskList,
            this._editTaskId,
            this._editStartTime,
            newTaskId,
            newComment,
            newStartTime,
            newEndTime
        );
        let task: string = JSON.stringify(taskBean);
        return this.http.put(this.backendUrl + '/workmonths/workdays/tasks/modify', task, {headers: this._headers})
            .map((res: Response) => res.json());
    }

    /**
     * This method will delete a selected task
     */
    public deleteTaskOnBackend(): void {
        this.getYearMonthAndDayFromSelectedDayOnTaskList();
        let taskBean: DeleteTaskRB = new DeleteTaskRB(
            this.yearOfSelectedDayOnTaskList,
            this.monthOfSelectedDayOnTaskList,
            this.dayOfSelectedDayOnTaskList,
            this._deleteTaskId,
            this._deleteStartTime
        );
        let task: string = JSON.stringify(taskBean);
        this.http.put(this.backendUrl + '/workmonths/workdays/tasks/delete', task, {headers: this._headers})
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                },
                (err) => {
                    if (err.status === undefined) {
                        this.getAllDisplayedData();
                    }
                }
            );
    }

    private setupOneWeek(weekIndex: number): void {
        for (let index = 0; index < 7; index++) {
            for (let workDay in this.workDaysNumberOfDay) {
                if (index < this.dayTypeOfFirstDay && weekIndex === 0) {
                    this._weeks[weekIndex].week[index] = new Day('empty');
                } else if (
                    index > this.dayTypeOfLastDay &&
                    ((this.amountOfDisplayedCells / 7 > 5 && weekIndex === 5) || (this.amountOfDisplayedCells / 7 <= 5 && weekIndex === 4))
                ) {
                    this._weeks[weekIndex].week[index] = new Day('empty');
                } else if (7 * weekIndex + index + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDay]) {
                    this._weeks[weekIndex].week[index] = new Day('work');
                    break;
                } else if (weekIndex < 5 || (this.amountOfDisplayedCells / 7 > 5 && weekIndex === 5)) {
                    this._weeks[weekIndex].week[index] = new Day('notempty');
                }
            }
        }
    }

    private getMonthlyStatistics(workMonths: Array<WorkMonth>): number[] {
        let statistics: number[] = [0,0];
        for (let index = 0; index < workMonths.length; index++) {
            if (workMonths[index].monthDate === this._monthDisplay) {
                statistics[0] = +workMonths[index].extraMinPerMonth.toString();
                statistics[1] = +workMonths[index].sumPerMonth.toString();
            }
            if (statistics.length === 0) {
                statistics[0] = 0;
                statistics[1] = 0;
            }
        }
        return statistics;
    }

    private getWorkDays(workMonths: Array<WorkMonth>): Array<WorkDay> {
        let workDays: Array<WorkDay>;
        for (let i = 0; i < workMonths.length; i++) {
            if (
                +workMonths[i].monthDate.split('-')[0] === this._selectedYear &&
                +workMonths[i].monthDate.split('-')[1] === this._selectedMonth
            ) {
                workDays = workMonths[i].days;
            }
        }
        return workDays;
    }

    private setupDailyStatAndTasksFromMonths(workMonths: Array<WorkMonth>): void {
        let workDays: Array<WorkDay> = this.getWorkDays(workMonths);
        for (let j = 0; j < workDays.length; j++) {
            if (workDays[j].actualDay.toString() === this._selectedDayOnTaskList) {
                this._dailyStat[0] = workDays[j].extraMinPerDay;
                this._dailyStat[1] = workDays[j].sumPerDay;
                this._dailyStat[2] = workDays[j].requiredMinPerDay;
                this._tasks = workDays[j].tasks;
            }
        }
    }

    private setupWeeks(): void {
        for (let weekIndex = 0; weekIndex < 4; weekIndex++) {
            this.setupOneWeek(weekIndex);
        }
        if (this.amountOfDisplayedCells / 7 > 4) {
            for (let weekIndex = 4; weekIndex < 6; weekIndex ++) {
                this.setupOneWeek(weekIndex);
            }
        }
    }

    private addDayHelper(requiredHours: number, url: string): Observable<Response> {
        let workDayBean: WorkDayRB = new WorkDayRB(this._selectedYear, this._selectedMonth, this._addedDay, requiredHours);
        let workDay: string = JSON.stringify(workDayBean);
        return this.http.post(this.backendUrl + url, workDay, {headers: this._headers})
            .map((res: Response) => res.json());
    }

    private addTaskSubscribe(errorStatus: number) {
        if (errorStatus === 417) {
            this.sendAlert('<p i18n="not expected time order">The task should begin earlier then it ends!</p>');
        }
        if (errorStatus === 406) {
            this.sendAlert('<p i18n="not valid task id alert">This task id is not valid, valid id for erxample: 7856, LT-9635, ...</p>');
        }
        if (errorStatus === 416) {
            this.sendAlert('<p i18n="quarter hours alert">The duration of the task should be multiple of the quarter hours!</p>');
        }
        if (errorStatus === 409) {
            this.sendAlert('<p i18n="not separated alert">The task has a common interval with an existing task, the intervals should be separated!</p>');
        }
        if (errorStatus === 411) {
            this.sendAlert('<p i18n="task id and start time are required">The task id and the start time are required fields, do not leave them empty!</p>');
        }
        if (errorStatus === undefined) {
            this.getAllDisplayedData();
        }
    }

    private getYearMonthAndDayFromSelectedDayOnTaskList(): void {
        this.yearOfSelectedDayOnTaskList = +this._selectedDayOnTaskList.split('-')[0];
        this.monthOfSelectedDayOnTaskList = +this._selectedDayOnTaskList.split('-')[1];
        this.dayOfSelectedDayOnTaskList = +this._selectedDayOnTaskList.split('-')[2];
    }

    private refreshTokenFromBackend(): Observable<Response> {
        return this.http.get(this.backendUrl + '/refresh-token', {headers: this._headers})
            .map((res: Response) => res);
    }

    public getDayValue(weekindex: number, dayindex: number): number {
        return weekindex * 7 + dayindex + 1 - this.dayTypeOfFirstDay;
    }
}
