"use strict";
var core_1 = require('@angular/core');
var tlog_service_1 = require('../../shared/services/tlog.service');
var PagerComponent = (function () {
    function PagerComponent(tlogService) {
        this.tlogService = tlogService;
        this.selectedMonth = new Date();
    }
    PagerComponent.prototype.ngOnInit = function () {
        this.selectedMonth = this.tlogService.getSelectedMonth();
        this.displayMonth = this.tlogService.getDisplayMonth();
    };
    PagerComponent.prototype.prevClick = function () {
        // this.selectedMonth.addMonths(-1);
        this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1);
        this.tlogService.clearLists();
        this.tlogService.setSelectedMonth(this.selectedMonth);
        this.tlogService.setupValues();
        this.displayMonth = this.tlogService.getDisplayMonth();
    };
    PagerComponent.prototype.nextClick = function () {
        // this.selectedMonth.addMonths(1);
        this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1);
        this.tlogService.clearLists();
        this.tlogService.setSelectedMonth(this.selectedMonth);
        this.tlogService.setupValues();
        this.displayMonth = this.tlogService.getDisplayMonth();
    };
    PagerComponent = __decorate([
        core_1.Component({
            selector: 'my-pager',
            templateUrl: 'pager.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], PagerComponent);
    return PagerComponent;
}());
exports.PagerComponent = PagerComponent;
//# sourceMappingURL=pager.component.js.map