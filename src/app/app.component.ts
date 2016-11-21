import {Component} from '@angular/core';

import '../style/app.scss';
import {TlogService} from './shared/Services/tlog.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {





  constructor(private tlogService: TlogService) {
    // Do something with api
  }


}
