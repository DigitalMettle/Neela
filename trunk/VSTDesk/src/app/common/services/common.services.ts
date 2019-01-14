import { Injectable } from '@angular/core'
import { Projects, Project, UserProfile } from './../lib/project'
import { BehaviorSubject , Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable()
export class CommonServices {
     
     userImage : BehaviorSubject<string> = new BehaviorSubject<string>('');
     userImage$ : Observable<string> = this.userImage.asObservable();

     userProfile : BehaviorSubject<Object> = new BehaviorSubject<Object>({});
    userProfile$: Observable<Object> = this.userProfile.asObservable();
    appNameSubject: Subject<{ HeaderLogo: string, HeaderAppName: string }> = new Subject<{ HeaderLogo: string, HeaderAppName: string }>();

     constructor(public http : HttpClient){

     }

     load() {
         
        let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if(userObject){
        Projects.selectedProjectId = userObject["selectedProjectId"];
        Projects.Project = new Array<Project>();
        for (let project of userObject["ProjectList"]) {
            Projects.Project.push(project);
        }

        UserProfile.FirstName = userObject["FirstName"]
        UserProfile.LastName = userObject["LastName"]
        UserProfile.ProfileImageUrl = userObject["ProfileImageUrl"]
        UserProfile.UserId = userObject["UserId"]
        UserProfile.Role = userObject["role"]
        this.setUserImage(UserProfile.ProfileImageUrl);
        }
    }

     setUserImage(userProfileImage: string) {

         this.userImage.next(userProfileImage);
    }

     setUserProfileHeader(userObject : Object){
         this.userProfile.next(userObject);
    }

     setUserProfileData(data): Observable<any> {
        return this.http.post('api/user/setuserprofiledata', data);
    }

    getUserProfileData(): Observable<any> {
        return this.http.get('api/user/getuserprofiledata');
    } 

    setProfileImage(data : string){
        let userObject =  localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null
           if(userObject){
               userObject['ProfileImageUrl'] = data;
               localStorage.setItem('authorization' , JSON.stringify(userObject))
           }
    }

    setUserName(user : any){
            let userObject =  localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null
           if(userObject){
               userObject['FirstName'] = user.FirstName;
               userObject['LastName'] = user.LastName;
               localStorage.setItem('authorization' , JSON.stringify(userObject))
           }

           
    }

    resetPassword(data:any): Observable<any> {
        return this.http.post('api/user/resetPassword',data);
    } 

    setHeaderValues(data) {
        this.appNameSubject.next(data);
    }

    getHeaderValues(): Observable<{ HeaderLogo: string, HeaderAppName: string }> {
        return this.appNameSubject.asObservable();
    }
}