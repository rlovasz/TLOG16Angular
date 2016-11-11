"use strict";
var core_1 = require('@angular/core');
var MonthlyStatComponent = (function () {
    function MonthlyStatComponent() {
        this.extraMinutes = -600;
        this.sumMinutes = 2000;
    }
    MonthlyStatComponent.prototype.getStyle = function () {
        if (this.extraMinutes >= 0) {
            return 'green';
        }
        else {
            return 'red';
        }
    };
    MonthlyStatComponent = __decorate([
        core_1.Component({
            selector: 'monthly-stat',
            templateUrl: 'monthly-stat.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MonthlyStatComponent);
    return MonthlyStatComponent;
}());
exports.MonthlyStatComponent = MonthlyStatComponent;
//# sourceMappingURL=monthly-stat.component.js.map