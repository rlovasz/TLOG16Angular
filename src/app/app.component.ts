import {Component} from '@angular/core';

import '../style/app.scss';
import {TlogService} from './shared/Services/tlog.service';
import {Router} from '@angular/router';
import {Headers} from '@angular/http';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private tlogService: TlogService, private router: Router) {

    }


}
