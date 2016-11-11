"use strict";
var core_1 = require('@angular/core');
var tlog_service_1 = require('../../../../shared/services/tlog.service');
var DayComponent = (function () {
    function DayComponent(tlogService) {
        this.tlogService = tlogService;
    }
    DayComponent.prototype.ngOnInit = function () {
        this.dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
        this.selectedMonth = this.tlogService.getSelectedMonth();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DayComponent.prototype, "dayindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DayComponent.prototype, "weekindex", void 0);
    DayComponent = __decorate([
        core_1.Component({
            selector: 'my-day',
            templateUrl: 'day.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map