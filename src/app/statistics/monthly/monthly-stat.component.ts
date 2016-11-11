import {Component} from '@angular/core';

@Component({
    selector: 'monthly-stat',
    templateUrl: 'monthly-stat.component.html'
})
export class MonthlyStatComponent {

    public extraMinutes: number = -600;
    public sumMinutes: number = 2000;

    constructor() { }

    public getStyle() {
        if (this.extraMinutes >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    }
}
