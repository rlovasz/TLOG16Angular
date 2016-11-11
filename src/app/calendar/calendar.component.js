"use strict";
var core_1 = require('@angular/core');
var tlog_service_1 = require('../shared/services/tlog.service');
var CalendarComponent = (function () {
    function CalendarComponent(tlogService) {
        this.tlogService = tlogService;
        this.dayNameList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'my-calendar',
            templateUrl: 'calendar.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map