import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Projects } from './../../common'

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) {

    }
    createWorkItem(data, projectId): Observable<any> {

        return this.http.post('api/worktitems/createworkitem/project/' + projectId, data);
    }
    getWorkItem(projectId, workItemId): Observable<any> {

        return this.http.get('api/worktitems/getprojectworkitembyid/project/' + projectId + '/workitem/' + workItemId);
    }

    getProjectWorkItem(projectId): Observable<any> {
        return this.http.get('api/worktitems/getprojectworkitems/project/' + projectId);
    }


    getAllProjectWorkItemStatus(projectId): Observable<any> {

        return this.http.get('api/worktitems/getallprojectworkitemstatus/project/' + projectId);
    }
    getProjectStatusByProjectId(projectId): Observable<any> {

        return this.http.get('api/project/projectstatus/project/' + projectId);
    }

    getAssignedProjectList(): Observable<any> {
        return this.http.get('api/user/getassingedprojectlist');
    }

    GetEditableItems(projectId): any {
        return this.http.get('api/project/getEditableItems/project/'+projectId);
    }
   
    getGridColumnFields(projectId: any): any {
        return this.http.get('api/project/getgridcolumnfields/project/' + projectId);
    }
    getChartData(data: any): Observable<any> {
        return this.http.get('api/project/getchartsdata/project/' + data);
    }
}