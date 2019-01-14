import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()
export class AdminService {
   
   
    constructor(private http: HttpClient) {
        
    }
    getProjectList(): Observable<any> {
        
        return this.http.get('api/Project/getprojectslist');
    }

    getAdminSettings(projectId:any): Observable<any> {

        return this.http.get('api/project/getprojectsettings?projectId=' + projectId);

    }

    setProjectSetting(data: any): Observable<any> {

        return this.http.put('api/Project/updateprojectsettings', data);
    }

    sendInvite(data: any): Observable<any> {

        return this.http.post('api/account/sendinvite', data);
    }

    isUserEmailExists(data: any): Observable<any> {

        return this.http.get('api/account/useremailexist?emailId='+ data);
    }

     isUserNameExists(data: any): Observable<any> {

        return this.http.get('api/account/verifyusername?userName='+ data);
    }

    getUserList(data:any): Observable<any> {
        return this.http.get('api/user/getuserlist?search=' + data);
     }
    
    getAdminUserList(): Observable<any> {
        return this.http.get('api/user/getadminuserlist');
    }

    getUserDetails(data : any): Observable<any> {
        return this.http.get('api/user/getuseraddprojectdetail?userId='+data);
    }

    SyncProject() : Observable<any> {
        return this.http.post('api/project/syncprojects' , {});
    }

    updateUserDetails(data:any): Observable <any> {
        return this.http.post('api/user/updateuserandprojects', data);
    }

    getUsersByProject(): Observable<any> {
        return this.http.get('api/project/getusersbyproject');
    }

    deleteUser(data: any): Observable<any> {
        return this.http.delete('api/user/deleteusers?userId=' + data);
    }

    getCompanySettings(): Observable<any> {
        return this.http.get('api/account/getcompanysettings');
    }
    setCompanySettings(data:any): Observable<any> {
        return this.http.post('api/account/savecompanysettings',data);
        
    }
    getChartData(data:any): Observable<any> {
        return this.http.get('api/project/getchartsdata/project/'+data);
    }
    getProjectStatusByProjectId(projectId): Observable<any> {

        return this.http.get('api/project/projectstatus/project/' + projectId);
    }
    getProjectWorkItem(projectId): Observable<any> {
        return this.http.get('api/worktitems/getprojectworkitems/project/' + projectId);
    }
    getGridColumnFields(projectId: any): any {
        return this.http.get('api/project/getgridcolumnfields/project/' + projectId);
    }
    createWorkItem(data, projectId): Observable<any> {

        return this.http.post('api/worktitems/createworkitem/project/' + projectId, data);
    }
    getWorkItem(projectId, workItemId): Observable<any> {

        return this.http.get('api/worktitems/getprojectworkitembyid/project/' + projectId + '/workitem/' + workItemId);
    }

    GetEditableItems(projectId): any {
        return this.http.get('api/project/getEditableItems/project/' + projectId);
    }
}