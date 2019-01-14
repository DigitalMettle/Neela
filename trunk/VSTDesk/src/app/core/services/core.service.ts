import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class CoreService {

    constructor(private http: HttpClient) {

    }

    login(data: any): Observable<any> {
        let body = `username=${data.Username}&password=${encodeURIComponent(data.Password)}`;
        return this.http.post('/token', body);
    }

    sendForgotPasswordLink(data: any): Observable<any> {
        return this.http.post('/api/account/sendpasswordresetlink?username='+data.Username,data);
    }

    resetPassword(data: any): Observable<any> {
        return this.http.post('/api/account/resetPassword', data);
    }

     generateToken(data: any): Observable<any> {
        return this.http.post('/api/account/generatetfstoken', data );
    }

     createPassword(data: any): Observable<any> {
         return this.http.post('/api/account/createuserPassword', data);
     }
     getCompanySettings(): Observable<any> {
         return this.http.get('api/account/getcompanysettings');
    }

    LoginAsAdmin(): Observable<any> {
        return this.http.get("api/account/loginasadmin");
    }
}