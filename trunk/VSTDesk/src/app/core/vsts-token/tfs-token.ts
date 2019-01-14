import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CoreService } from '../services/core.service'
import { error } from 'selenium-webdriver';
import { DataModel, CommonServices} from '../../common';

@Component({
    selector : 'app-tfs-token',
    template :`Redirecting to Neela ...`
})

export class TFSTokenComponent{
    tokenObject: any = {}
    constructor(private activatedRoute: ActivatedRoute, private coreService: CoreService, private router: Router, private commonServices: CommonServices) {

}

ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
        this.tokenObject = {
           Code : params['code'],
           State : params['state']
        }

        this.coreService.generateToken(this.tokenObject).subscribe(res => {
        if (res) {
            let UserObject = Object.assign({ Username: res.Data.User.Username, UserId: res.Data.User.UserId, FirstName: res.Data.User.FirstName, LastName: res.Data.User.LastName, ProfileImageUrl: res.Data.User.ProfileImageUrl, ProjectList: res.Data.User.ProjectList, isTokenGenerate: true })
            let userObject = Object.assign({ token: JSON.parse(res.Data.Access_Token)['auth_token'], role: res.Data.User.UserRole }, UserObject);
            DataModel.UserRole = res.Data.User.UserRole;
            localStorage.setItem('authorization', JSON.stringify(userObject));
            this.commonServices.load();

            this.router.navigateByUrl('admin/dashboard');
        }
    }, (error) => {
        debugger
        localStorage.removeItem('authorization')
        this.router.navigateByUrl('/login');
    });

})

}

}