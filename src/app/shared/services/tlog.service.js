"use strict";
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var Classes_1 = require('../classes/Classes');
var TlogService = (function () {
    function TlogService() {
        this.i = 0;
        this.firstWeek = new Classes_1.Week();
        this.secondWeek = new Classes_1.Week();
        this.thirdWeek = new Classes_1.Week();
        this.fourthWeek = new Classes_1.Week();
        this.fifthWeek = new Classes_1.Week();
        this.sixthWeek = new Classes_1.Week();
        this.weeks = [];
        this.workDays = ['2016-11-7', '2016-11-8', '2016-11-9'];
        this.workDaysNumberOfDay = [];
        this.selectedMonth = new Date();
    }
    TlogService.prototype.setupValues = function () {
        this.displayMonth = this.selectedMonth.getFullYear() + '-' + (this.selectedMonth.getMonth() + 1);
        this.daysInMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0).getDate();
        this.dayTypeOfFirstDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 0).getDay();
        this.dayTypeOfLastDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), this.daysInMonth - 1).getDay();
        this.i = this.dayTypeOfFirstDay + this.daysInMonth;
        for (var index = 0; index < 7; index++) {
            if (index >= this.dayTypeOfFirstDay) {
                this.firstWeek.week.push(new Classes_1.Day('notempty'));
            }
            else {
                this.firstWeek.week.push(new Classes_1.Day('empty'));
            }
            this.weeks[0] = this.firstWeek;
            this.secondWeek.week.push(new Classes_1.Day('notempty'));
            this.weeks[1] = this.secondWeek;
            this.thirdWeek.week.push(new Classes_1.Day('notempty'));
            this.weeks[2] = this.thirdWeek;
            this.fourthWeek.week.push(new Classes_1.Day('notempty'));
            this.weeks[3] = this.fourthWeek;
            if (this.i / 7 > 4) {
                if (this.i / 7 > 5) {
                    this.fifthWeek.week.push(new Classes_1.Day('notempty'));
                    if (index > this.dayTypeOfLastDay) {
                        this.sixthWeek.week.push(new Classes_1.Day('empty'));
                    }
                    else {
                        this.sixthWeek.week.push(new Classes_1.Day('notempty'));
                    }
                    this.weeks[4] = this.fifthWeek;
                    this.weeks[5] = this.sixthWeek;
                }
                else {
                    if (index > this.dayTypeOfLastDay) {
                        this.fifthWeek.week.push(new Classes_1.Day('empty'));
                    }
                    else {
                        this.fifthWeek.week.push(new Classes_1.Day('notempty'));
                    }
                    this.weeks[4] = this.fifthWeek;
                }
            }
        }
        for (var index = 0; index < this.workDays.length; index++) {
            this.workDaysNumberOfDay[index] = +this.workDays[index].split('-')[2];
        }
    };
    TlogService.prototype.clearLists = function () {
        this.weeks = [];
        this.firstWeek = new Classes_1.Week();
        this.secondWeek = new Classes_1.Week();
        this.thirdWeek = new Classes_1.Week();
        this.fourthWeek = new Classes_1.Week();
        this.fifthWeek = new Classes_1.Week();
        this.sixthWeek = new Classes_1.Week();
    };
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
    TlogService.prototype.getWorkDaysNumberOfDay = function () {
        return this.workDaysNumberOfDay;
    };
    TlogService.prototype.getSelectedMonth = function () {
        return this.selectedMonth;
    };
    TlogService.prototype.getDayTypeOfFirstDay = function () {
        return this.dayTypeOfFirstDay;
    };
    TlogService.prototype.getDisplayMonth = function () {
        return this.displayMonth;
    };
    TlogService.prototype.setSelectedMonth = function (selectedMonth) {
        this.selectedMonth = selectedMonth;
    };
    TlogService.prototype.getWeeks = function () {
        return this.weeks;
    };
    TlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TlogService);
    return TlogService;
}());
exports.TlogService = TlogService;
//# sourceMappingURL=tlog.service.js.map