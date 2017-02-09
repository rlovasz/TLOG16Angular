import { NgModule } from '@angular/core';
import {ModalsModule} from '../modals/modals.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TlogService} from '../shared/Services/tlog.service';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskListViewComponent} from './task-list-view.component';
import {DailyStatComponent} from './daily-statistics/daily-stat.component';
import {routing} from './task-list-view.routing';


@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        ModalsModule,
        routing
    ],
    declarations: [
        TaskListComponent,
        TaskListViewComponent,
        DailyStatComponent
    ],
    exports: [
        TaskListComponent,
        TaskListViewComponent,
        DailyStatComponent
    ],
    providers: [
        TlogService
    ],
})
export class TaskListViewModule { }
