import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PagerComponent} from "./pager/pager.component";
import {WeekComponent} from "./week/week.component";
import {WorkdayCellComponent} from "./week/day/work/workday-cell.component";
import {DayComponent} from "./week/day/simple/day.component";
import {MonthlyStatComponent} from "./monthly-statistics/monthly-stat.component";
import {CalendarComponent} from "./calendar.component";
import {BrowserModule} from "@angular/platform-browser";
import {ModalsModule} from "../modals/modals.module";
import {TlogService} from "../shared/Services/tlog.service";


@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        ModalsModule
    ],
    declarations: [
        PagerComponent,
        WeekComponent,
        WorkdayCellComponent,
        DayComponent,
        MonthlyStatComponent,
        CalendarComponent
    ],
    exports: [
        PagerComponent,
        WeekComponent,
        WorkdayCellComponent,
        DayComponent,
        MonthlyStatComponent,
        CalendarComponent
    ],
    providers: [
        TlogService
    ],
})
export class CalendarModule { }
