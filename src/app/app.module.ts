import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {CalendarComponent} from './calendar/calendar.component';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import {TaskListViewComponent} from './task-list-view/task-list-view.component';
import {TlogService} from './shared/services/tlog.service';
import {WeekComponent} from './calendar/week/week.component';
import {DayComponent} from './calendar/week/day/simple/day.component';
import {WorkdayCellComponent} from './calendar/week/day/work/workday-cell.component';
import {PagerComponent} from './calendar/pager/pager.component';
import {TaskListComponent} from './task-list-view/task-list/task-list.component';
import {DailyStatComponent} from './statistics/daily/daily-stat.component';
import {MonthlyStatComponent} from './statistics/monthly/monthly-stat.component';
import {AddDayModalComponent} from './modals/addDayModal/add-day-modal.component';
import {NewTaskModalComponent} from './modals/newTaskModal/new-task-modal.component';
import {DeleteModalComponent} from './modals/deleteModal/delete-modal.component';
import {EditModalComponent} from './modals/editModal/edit-modal.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        CalendarComponent,
        TaskListViewComponent,
        WeekComponent,
        DayComponent,
        WorkdayCellComponent,
        PagerComponent,
        TaskListComponent,
        DailyStatComponent,
        MonthlyStatComponent,
        AddDayModalComponent,
        NewTaskModalComponent,
        DeleteModalComponent,
        EditModalComponent
    ],
    providers: [
        TlogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
