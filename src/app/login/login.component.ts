import { Component } from '@angular/core';
import {LoginService} from "../shared/Services/login.service";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
/**
 * This component is responsible for displaying the login page
 */
export class LoginComponent {
    private nameField: string;
    private pswField: string;

    constructor(private loginService: LoginService) {

    }

    /**
     * Does the login process with the given name and password
     * @param name
     * @param password
     */
    public login(name: string, password: string): void {
        this.loginService.login(name, password);
        this.resetValue();
    }

    /**
     * Does the register process for the new user with the given name and password
     * @param name
     * @param password
     */
    public register(name: string, password: string): void {
        this.loginService.register(name, password);
        this.resetValue();
    }

    private resetValue(): void {
        this.nameField = null;
        this.pswField = null;
    }
}
