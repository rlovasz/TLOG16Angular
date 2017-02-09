import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import {TlogService} from './shared/Services/tlog.service';
import {ModalsModule} from './modals/modals.module';
import {CalendarModule} from './calendar/calendar.module';
import {TaskListViewModule} from './task-list-view/task-list-view.module';
import {LoginModule} from './login/login.module';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {LoginService} from './shared/Services/login.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        ModalsModule,
        CalendarModule,
        TaskListViewModule,
        LoginModule
    ],
    declarations: [
        AppComponent,
        NavigationBarComponent
    ],
    providers: [
        TlogService,
        LoginService
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
