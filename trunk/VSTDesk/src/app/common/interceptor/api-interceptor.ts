import { Injectable } from '@angular/core'
import { Route, ActivatedRoute, Router } from '@angular/router'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/finally';
import {CommonServices } from './../services/common.services'



@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private loginUrl = '/token'
    private userProfileUrl = "api/user/uploadimage"
    private companyUploadSaveUrl = "api/account/uploadimage";    
    private profileImageUploadUrl = "api/account/uploadimage?type=profileimage"
    private backgroundImageForLoginUploadUrl = "api/account/uploadimage?type=backgroundimage";
    private headerLogoUploadUrl = "api/account/uploadimage?type=headerlogo";

    private toasterMessage = new BehaviorSubject<Object>(new Object({ type: '', message: '' }));
    message$: Observable<Object> = this.toasterMessage.asObservable();
    private index : number = 0;
    private loading = new BehaviorSubject<number>(0)
    loading$ : Observable<number> = this.loading.asObservable(); 

    constructor(public router: Router , public commonService : CommonServices) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.setAuthorizationHeader(req))
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                   
                    this.createMessage('success', [event.body.Message])
                }
            })
            .catch((event) => {
                if (event instanceof HttpErrorResponse)
                    return this.catchError(event)
            })
            .finally(() => {
                this.loading.next(--this.index);
            })
    }

    setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
     
        this.loading.next(++this.index);
        switch (req.url) {
            case this.loginUrl:
                return req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            case this.userProfileUrl: 
                let usertoken = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {}
                return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + usertoken } })
            case this.companyUploadSaveUrl:
            case this.profileImageUploadUrl:
            case this.headerLogoUploadUrl:
            case this.backgroundImageForLoginUploadUrl:
                let usertoken1 = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {}
                return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + usertoken1 } })
            default:
                let token = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {}
                return req.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } })
        }
    }

    catchError(error: HttpErrorResponse): Observable<any> {
       
        if (error.status === 302) {

            if (error && error.error && error.error.Data) {

                let UserObject = Object.assign({ Username: error.error.Data.User.Username, UserId : error.error.Data.User.UserId , FirstName : error.error.Data.User.FirstName, LastName : error.error.Data.User.LastName , ProfileImageUrl :  error.error.Data.User.ProfileImageUrl, ProjectList :  error.error.Data.User.ProjectList , isTokenGenerate: false, redirectUrl: error.error.Data.User.RedirectUrl })
                let userObject = Object.assign({ token: JSON.parse(error.error.Data.Access_Token)['auth_token'], role: error.error.Data.User.UserRole }, UserObject);
                localStorage.setItem('authorization', JSON.stringify(userObject));
                this.commonService.load();
            }

            if (error && error.error && error.error.Data && error.error.Data.User) {
                window.location.href = error.error.Data.User.RedirectUrl;
            }
            return Observable.empty();
        }
        if (error.status == 400) {
            this.createMessage('error', error.error.ErrorMessage)
        }
        if (error.status == 500) {
            this.createMessage('error', error.error.ErrorMessage)
        }
        return Observable.throw(error);
    }

    createMessage(title: string, message: string[]) {
        let toastermessage = {
            type: title,
            message: message
        }
        this.toasterMessage.next(toastermessage);
    }

}