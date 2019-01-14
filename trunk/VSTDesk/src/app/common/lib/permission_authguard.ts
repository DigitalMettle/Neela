import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRoles } from '../../common/utility/userRoles';
import { DataModel } from '../../common/utility/dataModel';
@Injectable()

export class PermissionAuthGuard implements CanActivate {

    constructor(public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        
            //used to prevent user access admin urls and vice-versa
        if (userObject)
        {
            
                if (userObject['role'] == UserRoles.Admin && state.url.indexOf('admin') != -1) {
                    return true;
                }
                else if (userObject['role'] == UserRoles.User && state.url.indexOf('admin') == -1) {
                    return true;
                }
                else {
                    this.router.navigate(['/forbidden']);
                }
        }
        else
        {
                return true;
        }
      }
 }
