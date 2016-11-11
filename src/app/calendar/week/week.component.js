"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tlog_service_1 = require("../tlog.service");
var Classes_1 = require("../Classes");
var WeekComponent = (function () {
    function WeekComponent(tlogService) {
        this.tlogService = tlogService;
        this.days = [];
        this.isWorkDay = [false, false, false, false, false, false, false];
    }
    WeekComponent.prototype.ngOnInit = function () {
        this.days = this.week.getWeek();
        for (var dayIndex = 0; dayIndex < this.days.length; dayIndex++) {
            for (var workDayIndex = 0; workDayIndex < this.tlogService.workDaysNumberOfDay.length; workDayIndex++) {
                if (this.weekindex * 7 + dayIndex + 1 - this.tlogService.dayTypeOfFirstDay === this.tlogService.workDaysNumberOfDay[workDayIndex]) {
                    this.isWorkDay[dayIndex] = true;
                }
            }
        }
    };
    WeekComponent.prototype.getStyle = function (isWorkday) {
        if (isWorkday === true) {
            return "white";
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
            templateUrl: '/app/week/week.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], WeekComponent);
    return WeekComponent;
}());
exports.WeekComponent = WeekComponent;
//# sourceMappingURL=week.component.js.map