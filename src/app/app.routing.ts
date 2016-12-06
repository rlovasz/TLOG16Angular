import { RouterModule, Routes } from '@angular/router';


import {CalendarComponent} from './calendar/calendar.component';
import {TaskListViewComponent} from './task-list-view/task-list-view.component';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'calendar',  component: CalendarComponent },
    {path: 'tasklist', component: TaskListViewComponent},
    {path: 'login', component: LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
