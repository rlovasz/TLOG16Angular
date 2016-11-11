"use strict";
var core_1 = require('@angular/core');
var Classes_1 = require('../../shared/classes/Classes');
var tlog_service_1 = require('../../shared/services/tlog.service');
var WeekComponent = (function () {
    function WeekComponent(tlogService) {
        this.tlogService = tlogService;
        this.days = [];
        this.isWorkDay = [false, false, false, false, false, false, false];
        this.workDaysNumberOfDay = [];
    }
    WeekComponent.prototype.ngOnInit = function () {
        this.dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
        this.workDaysNumberOfDay = this.tlogService.getWorkDaysNumberOfDay();
        this.days = this.week.week;
        for (var dayIndex = 0; dayIndex < this.days.length; dayIndex++) {
            for (var workDayIndex = 0; workDayIndex < this.workDaysNumberOfDay.length; workDayIndex++) {
                if (this.weekindex * 7 + dayIndex + 1 - this.dayTypeOfFirstDay === this.workDaysNumberOfDay[workDayIndex]) {
                    this.isWorkDay[dayIndex] = true;
                }
            }
        }
    };
    WeekComponent.prototype.getStyle = function (isWorkday) {
        if (isWorkday === true) {
            return 'white';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Classes_1.Week)
    ], WeekComponent.prototype, "week", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WeekComponent.prototype, "weekindex", void 0);
    WeekComponent = __decorate([
        core_1.Component({
            selector: 'my-week',
            templateUrl: 'week.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], WeekComponent);
    return WeekComponent;
}());
exports.WeekComponent = WeekComponent;
//# sourceMappingURL=week.component.js.map