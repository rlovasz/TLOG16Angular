import { Component, OnInit } from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Observable} from 'rxjs';
import {WorkDay} from "../shared/Classes/Classes";
import {Router} from "@angular/router";

@Component({
    selector: 'my-calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss']
})
/**
 * This component is responsible for the whole calendar view
 */
export class CalendarComponent implements OnInit {

    public dayNameList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(private tlogService: TlogService) {

    }

    /**
     * calculates all the needed data to display the calendar properly and refreshes the jwt
     */
    ngOnInit(): void {
        this.tlogService.getAllDisplayedData();
        this.tlogService.refreshToken();
        Observable.interval(this.tlogService.tokenRefreshIntervalInMillis).subscribe(x => {
            this.tlogService.refreshToken();
        });
    }


}
