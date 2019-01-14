import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRoles } from '../../common/utility/userRoles';
import { DataModel } from '../../common/utility/dataModel';
@Injectable()

export class LoginAuthGuard implements CanActivate {

    constructor(public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        
        if (userObject && !userObject['isTokenGenerate'] && state.url.indexOf('oauth/callback') == -1) {
            window.location.href = userObject['redirectUrl'];
        }
        else if (state.url == "" || state.url == "/") {
            if (userObject) {
                if (userObject['role'] == UserRoles.Admin) {
                    this.router.navigate(['/admin/dashboard']);
                }
                else if (userObject['role'] == UserRoles.User) {
                    this.router.navigate(['/dashboard'])
                }
            }
            else {
                this.router.navigate(['/login']);
            }
        }
        else if (state.url == "/login" && userObject) {
            if (userObject['role'] == UserRoles.Admin) {
                this.router.navigate(['/admin/dashboard']);
            }
            else if (userObject['role'] == UserRoles.User) {
                this.router.navigate(['/dashboard'])
            }
        }
        else if (!userObject && state.url != "/login") {
            this.router.navigate(['/login']);
        }
        else {
            return true;
        }

   
        


    }

    
}