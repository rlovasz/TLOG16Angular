"use strict";
var router_1 = require('@angular/router');
var calendar_component_1 = require('./calendar/calendar.component');
var task_list_view_component_1 = require('./task-list-view/task-list-view.component');
var routes = [
    {
        path: '',
        redirectTo: '/calendar',
        pathMatch: 'full'
    },
    {
        path: 'calendar',
        component: calendar_component_1.CalendarComponent
    },
    {
        path: 'tasklist',
        component: task_list_view_component_1.TaskListViewComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map