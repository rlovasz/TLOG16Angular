import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Week, Day} from '../classes/Classes';


@Injectable()
export class TlogService {

    private selectedMonth: any;
    private displayMonth: string;
    private dayTypeOfFirstDay: number;
    private dayTypeOfLastDay: number;
    private daysInMonth: number;
    private i: number = 0;
    private firstWeek: Week = new Week();
    private secondWeek: Week = new Week();
    private thirdWeek: Week = new Week();
    private fourthWeek: Week = new Week();
    private fifthWeek: Week = new Week();
    private sixthWeek: Week = new Week();
    private weeks: Week[] = [];
    private workDays: string[] = ['2016-11-7', '2016-11-8', '2016-11-9'];
    private workDaysNumberOfDay: number[] = [];

    constructor() {
        this.selectedMonth = new Date();

    }

    public setupValues() {
        this.displayMonth = this.selectedMonth.getFullYear() + '-' + (this.selectedMonth.getMonth() + 1);
        this.daysInMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0).getDate();
        this.dayTypeOfFirstDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 0).getDay();
        this.dayTypeOfLastDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), this.daysInMonth - 1).getDay();
        this.i = this.dayTypeOfFirstDay + this.daysInMonth;
        for (let index = 0; index < 7; index++) {
            if (index >= this.dayTypeOfFirstDay) {
                this.firstWeek.week.push(new Day('notempty'));
            } else {
                this.firstWeek.week.push(new Day('empty'));
            }
            this.weeks[0] = this.firstWeek;
            this.secondWeek.week.push(new Day('notempty'));
            this.weeks[1] = this.secondWeek;
            this.thirdWeek.week.push(new Day('notempty'));
            this.weeks[2] = this.thirdWeek;
            this.fourthWeek.week.push(new Day('notempty'));
            this.weeks[3] = this.fourthWeek;
            if (this.i / 7 > 4) {
                if (this.i / 7 > 5) {
                    this.fifthWeek.week.push(new Day('notempty'));
                    if (index > this.dayTypeOfLastDay) {
                        this.sixthWeek.week.push(new Day('empty'));
                    } else {
                        this.sixthWeek.week.push(new Day('notempty'));
                    }
                    this.weeks[4] = this.fifthWeek;
                    this.weeks[5] = this.sixthWeek;
                } else {
                    if (index > this.dayTypeOfLastDay) {
                        this.fifthWeek.week.push(new Day('empty'));
                    } else {
                        this.fifthWeek.week.push(new Day('notempty'));
                    }
                    this.weeks[4] = this.fifthWeek;
                }
            }
        }
        for (let index = 0; index < this.workDays.length; index++) {
            this.workDaysNumberOfDay[index] = +this.workDays[index].split('-')[2];
        }
    }

    public clearLists() {
        this.weeks = [];
        this.firstWeek = new Week();
        this.secondWeek = new Week();
        this.thirdWeek = new Week();
        this.fourthWeek = new Week();
        this.fifthWeek = new Week();
        this.sixthWeek = new Week();
    }


    // private headers = new Headers({'Content-Type': 'application/json'});
    //
    // constructor(private http: Http) { }
    //
    // getWorkDaysInMonth(year: number, displayMonth: number) : any{
    //
    //     // return this.http.get('http://127.0.0.1:9090/tlog-backend/timelogger/workmonths/'+year+'/'+displayMonth)
    //     //     .toPromise()
    //     //     .then(response => response.json().data as any);
    // }
    //
    // getWorkMonths() : any{
    //     return this.http.get('http://127.0.0.1:9090/tlog-backend/timelogger/workmonths')
    //         .toPromise()
    //         .then(response => response.json().data as any);
    // }
    //
    // addDayWeekday(day: any) : void{
    //     this.http.post('http://127.0.0.1:9090/tlog-backend/timelogger/workmonths/workdays',day, {headers: this.headers})
    //         .map(response => {
    //             if(response.status === 300) {
    //                 //WriteTODO
    //             }
    //         });
    // }
    //
    // addDayWeekend(day: any) : void{
    //     this.http.post('http://127.0.0.1:9090/tlog-backend/timelogger/workmonths/workdays/weekend',day, {headers: this.headers});
    //
    // }
    public getWorkDaysNumberOfDay(): number[] {
        return this.workDaysNumberOfDay;
    }

    public getSelectedMonth(): Date {
        return this.selectedMonth;
    }

    public getDayTypeOfFirstDay(): number {
        return this.dayTypeOfFirstDay;
    }

    public getDisplayMonth(): string {
        return this.displayMonth;
    }

    public setSelectedMonth(selectedMonth: Date) {
        this.selectedMonth = selectedMonth;
    }

    public getWeeks(): Week[] {
        return this.weeks;
    }
}
