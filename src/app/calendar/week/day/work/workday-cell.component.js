"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var tlog_service_1 = require('../../../../shared/services/tlog.service');
var WorkdayCellComponent = (function () {
    function WorkdayCellComponent(tlogService, router) {
        this.tlogService = tlogService;
        this.router = router;
        this.minute = 420;
    }
    WorkdayCellComponent.prototype.ngOnInit = function () {
        this.selectedMonth = this.tlogService.getSelectedMonth();
        this.dayTypeOfFirstDay = this.tlogService.getDayTypeOfFirstDay();
    };
    WorkdayCellComponent.prototype.getStyle = function () {
        if (this.minute >= 0) {
            return 'green';
        }
        else {
            return 'red';
        }
    };
    WorkdayCellComponent.prototype.gotoTaskListView = function () {
        this.router.navigate(['/tasklist']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WorkdayCellComponent.prototype, "dayindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WorkdayCellComponent.prototype, "weekindex", void 0);
    WorkdayCellComponent = __decorate([
        core_1.Component({
            selector: 'my-workday-cell',
            templateUrl: 'workday-cell.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService, router_1.Router])
    ], WorkdayCellComponent);
    return WorkdayCellComponent;
}());
exports.WorkdayCellComponent = WorkdayCellComponent;
//# sourceMappingURL=workday-cell.component.js.map