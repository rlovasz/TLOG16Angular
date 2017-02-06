import {Injectable} from "@angular/core";
import {TlogService} from "./tlog.service";
import {Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

    constructor(private tlogService: TlogService, private router: Router) {
    }

    /**
     * This method does the logout process
     */
    public logout(): void {
        this.tlogService.loggedIn = false;
        this.tlogService.headers = new Headers({'Content-Type': 'application/json'});
        localStorage.removeItem('token');
    }

    /**
     * Does the login process with the given name and password
     * @param name
     * @param password
     */
    public login(name: string, password: string): void {
        this.tlogService.loginUserInBackend(name, password).subscribe(
            (data) => {
                let authorizationHeader: string = data.headers.get('Authorization');
                this.tlogService.jwtToken = authorizationHeader.split(' ')[1];
                let header = new Headers({'Content-Type': 'application/json', 'Authorization': authorizationHeader});
                this.tlogService.headers = header;
                this.tlogService.loggedIn = true;
                localStorage.setItem('token', this.tlogService.jwtToken);
                Observable.interval(this.tlogService.tokenRefreshIntervalInMillis).subscribe(x => {
                    this.tlogService.refreshToken();
                });
                this.tlogService.selectedDate = new Date();
                this.router.navigate(['/calendar']);
            },
            (err) => {
                if (err.status === 401) {
                    this.tlogService.sendAlert('<p i18n="name or password alert">Incorrect username or password</p>');
                }
            }
        );
    }

    /**
     * Does the register process for the new user with the given name and password
     * @param name
     * @param password
     */
    public register(name: string, password: string): void {
        if (name && password) {
            this.tlogService.registerUserInBackend(name, password).subscribe(
                (data) => {
                },
                (err) => {
                    console.log(err);
                    if (err.status === 409) {
                        this.tlogService.sendAlert('<p i18n="name exists alert">This username already exists, please try an other one!</p>');
                    }
                }
            );
        } else {
            this.tlogService.sendAlert('<p i18n="empty name or psw alert">You have to type in a name and a password</p>');
        }
    }
}
