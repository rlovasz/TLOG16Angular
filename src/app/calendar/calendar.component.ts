import { Component, OnInit } from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'my-calendar',
    templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {

    dayNameList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(private tlogService: TlogService) {

    }

    ngOnInit() {
        this.tlogService.getAllDisplayedData();
        this.tlogService.refreshToken();
        Observable.interval(240000).subscribe(x => {
            this.tlogService.refreshToken();
        });
    }



}
