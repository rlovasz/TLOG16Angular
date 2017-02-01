import { Component } from '@angular/core';
import {TlogService} from "../shared/Services/tlog.service";
import {Router} from "@angular/router";
import {LoginService} from "../shared/Services/login.service";

@Component({
    selector: 'my-nav-bar',
    templateUrl: 'navigation-bar.component.html',
    styleUrls: ['navigation-bar.component.scss']
})
export class NavigationBarComponent {
    constructor(private tlogService: TlogService, private router: Router, private loginService: LoginService) { }

    /**
     * This method navigates the user to login page if not logged in or the calendar view if logged in
     */
    public homepage(): void {
        if (this.tlogService.loggedIn === true) {
            this.router.navigate(['/calendar']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    /**
     * This method helps to select a day to list when user navigates to task list view from navigation bar
     */
    public setNewSelectedMonth(): void {
        let sortedWorkDays: string[] = this.tlogService.getSortedDays();
        console.log(sortedWorkDays);
        this.tlogService.selectedDayOnTaskList = sortedWorkDays[0];
    }

}
