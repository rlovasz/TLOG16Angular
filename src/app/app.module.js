"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var calendar_component_1 = require('./calendar/calendar.component');
var app_routing_1 = require('./app.routing');
var hmr_1 = require('@angularclass/hmr');
var task_list_view_component_1 = require('./task-list-view/task-list-view.component');
var tlog_service_1 = require('./shared/services/tlog.service');
var week_component_1 = require('./calendar/week/week.component');
var day_component_1 = require('./calendar/week/day/simple/day.component');
var workday_cell_component_1 = require('./calendar/week/day/work/workday-cell.component');
var pager_component_1 = require('./calendar/pager/pager.component');
var task_list_component_1 = require('./task-list-view/task-list/task-list.component');
var daily_stat_component_1 = require('./statistics/daily/daily-stat.component');
var monthly_stat_component_1 = require('./statistics/monthly/monthly-stat.component');
var add_day_modal_component_1 = require('./modals/addDayModal/add-day-modal.component');
var new_task_modal_component_1 = require('./modals/newTaskModal/new-task-modal.component');
var delete_modal_component_1 = require('./modals/deleteModal/delete-modal.component');
var edit_modal_component_1 = require('./modals/editModal/edit-modal.component');
var AppModule = (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        console.log('HMR store', store);
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // recreate elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                calendar_component_1.CalendarComponent,
                task_list_view_component_1.TaskListViewComponent,
                week_component_1.WeekComponent,
                day_component_1.DayComponent,
                workday_cell_component_1.WorkdayCellComponent,
                pager_component_1.PagerComponent,
                task_list_component_1.TaskListComponent,
                daily_stat_component_1.DailyStatComponent,
                monthly_stat_component_1.MonthlyStatComponent,
                add_day_modal_component_1.AddDayModalComponent,
                new_task_modal_component_1.NewTaskModalComponent,
                delete_modal_component_1.DeleteModalComponent,
                edit_modal_component_1.EditModalComponent
            ],
            providers: [
                tlog_service_1.TlogService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map