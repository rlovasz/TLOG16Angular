import { Component, OnInit } from '@angular/core';
import {TlogService} from '../shared/services/tlog.service';
import {Week} from '../shared/classes/Classes';


@Component({
    selector: 'my-calendar',
    templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {

    dayNameList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


    constructor(private tlogService: TlogService) {}

    ngOnInit() {
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    }



}
