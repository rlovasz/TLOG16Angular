import { Component, OnInit } from '@angular/core';
import {TlogService} from '../shared/Services/tlog.service';
import {Router} from '@angular/router';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    private nameField: string;
    private pswField: string;

    resetValue() {
        this.nameField = null;
        this.pswField = null;
    }

    constructor(private tlogService: TlogService, private router: Router) { }

    ngOnInit() { }

    login(name: string, password: string) {
        this.tlogService.loginUser(name, password).subscribe(
            (data) => {
                this.tlogService.setJwtToken(data.headers.get('Authorization').split(' ')[1]);
                let header = new Headers({'Content-Type': 'application/json', 'Authorization': data.headers.get('Authorization')});
                this.tlogService.setHeaders(header);
                this.resetValue();
                this.tlogService.setLoggedIn(true);
                localStorage.setItem('token', this.tlogService.getJwtToken());
                Observable.interval(240000).subscribe(x => {
                    this.tlogService.refreshToken();
                });
                this.router.navigate(['/calendar']);
            },
            (err) => {
                if (err.status === 401) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'Incorrect username or password'
                    });
                }
                this.resetValue();
            }
        );
    }

    register(name: string, password: string) {
        this.tlogService.registerUser(name, password).subscribe(
            (data) => console.log(data),
            (err) => {
                console.log(err);
                if (err.status === 409) {
                    bootbox.alert({
                        title: 'Warning',
                        message: 'This username already exists, please try an other one!'
                    });
                }
            }
        );
        this.resetValue();

    }

}
