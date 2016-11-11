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
var tlog_service_1 = require("../../tlog.service");
var DayComponent = (function () {
    function DayComponent(tlogService) {
        this.tlogService = tlogService;
    }
    DayComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DayComponent.prototype, "dayindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DayComponent.prototype, "weekindex", void 0);
    DayComponent = __decorate([
        core_1.Component({
            selector: 'my-day',
            templateUrl: '/app/day/simple/day.component.html'
        }), 
        __metadata('design:paramtypes', [tlog_service_1.TlogService])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map