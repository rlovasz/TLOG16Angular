import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListViewComponent} from './task-list-view.component';


const routes: Routes = [
    { path: '', component: TaskListViewComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
