import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {TaskListViewComponent} from './task-list-view/task-list-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'tasklist',
    component: TaskListViewComponent
  }
];

export const routing = RouterModule.forRoot(routes);
