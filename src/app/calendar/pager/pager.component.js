"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tlog_service_1 = require("../tlog.service");
var PagerComponent = (function () {
    function PagerComponent(tlogService) {
        this.tlogService = tlogService;
    }
    PagerComponent.prototype.ngOnInit = function () {
    };
    PagerComponent.prototype.prevClick = function () {
        this.tlogService.selectedMonth.addMonths(-1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    };
    PagerComponent.prototype.nextClick = function () {
        this.tlogService.selectedMonth.addMonths(1);
        this.tlogService.clearLists();
        this.tlogService.setupValues();
    };
    PagerComponent = __decorate([
        core_1.Component({
            selector: 'my-pager',
            templateUrl: '/app/pager/pager.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], PagerComponent);
    return PagerComponent;
}());
exports.PagerComponent = PagerComponent;
//# sourceMappingURL=pager.component.js.map