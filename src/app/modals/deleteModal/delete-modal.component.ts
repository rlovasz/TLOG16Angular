import { Component, OnInit } from '@angular/core';
import {TlogService} from '../../shared/Services/tlog.service';

@Component({
    selector: 'delete-modal',
    templateUrl: 'delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
    constructor(private tlogService: TlogService) { }

    ngOnInit() { }

}
