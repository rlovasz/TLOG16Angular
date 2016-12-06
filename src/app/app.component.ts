import {Component} from '@angular/core';

import '../style/app.scss';
import {TlogService} from './shared/Services/tlog.service';
import {Router} from "@angular/router";
import {Headers} from "@angular/http";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(private tlogService: TlogService, private router: Router) {
    }

    setNewSelectedMonth() {
        let sortedWorkDays = this.tlogService.getSortedDays();
        console.log(sortedWorkDays);
        this.tlogService.setSelectedDayOnTaskList(sortedWorkDays[0]);
    }

    logout() {
        this.tlogService.setLoggedIn(false);
        this.tlogService.setHeaders(new Headers({'Content-Type': 'application/json'}));
    }

    homepage() {
        let loggedIn = this.tlogService.getLoggedIn();
        if(loggedIn === true) {
            this.router.navigate(['/calendar']);
        } else {
            this.router.navigate(['/login']);
        }
    }

}
