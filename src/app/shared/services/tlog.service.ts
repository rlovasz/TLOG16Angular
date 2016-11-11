import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Week, Day} from '../classes/Classes';

declare var datejs: any;

@Injectable()
export class TlogService {

    selectedMonth: any;
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
    weeks: Week[] = [];
    workDays: string[] = ['2016-11-7', '2016-11-8', '2016-11-9'];
    workDaysNumberOfDay: number[] = [];

    constructor() {
        this.selectedMonth = new Date();

    }

    public setupValues() {
        this.month = this.selectedMonth.getFullYear() + '-' + (this.selectedMonth.getMonth() + 1);
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
    // getWorkDaysInMonth(year: number, month: number) : any{
    //
    //     // return this.http.get('http://127.0.0.1:9090/tlog-backend/timelogger/workmonths/'+year+'/'+month)
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
    public getWorkDaysNumberOfDay() {
        return this.workDaysNumberOfDay;
    }
}
