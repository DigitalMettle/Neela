import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service'
import { UserRoles, DataModel , CommonServices } from '../../common';
import { error } from 'util';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    body: any;
    loginForm: FormGroup;
    CompanyPic: any;
    CompanyMessage: "";
    BackgroundImageUrlForLogin=""


    constructor(public coreService: CoreService, public fb: FormBuilder, public router: Router , private commonServices : CommonServices) {

        this.loginForm = this.fb.group({
            Username: [''],
            Password: ['']
        })

    }

    ngOnInit() {
        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
       
    }

    // Remove class from body tag
    ngOnDestroy() {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    }

    getCompanySettings() {
        this.coreService.getCompanySettings()
            .subscribe(res => {
                if (res.Data) {
                    this.CompanyPic = res.Data.CompanyLogo;
                    this.CompanyMessage = res.Data.CompanyMessage;
                    this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                    $('body').css({ 'background-image': 'url(' + this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover' });
                }
            });
    }

    doLogin() {
        this.coreService.login(this.loginForm.value).subscribe(res => {
            if (res) {
                let UserObject = Object.assign({ Username: res.Data.User.Username, UserId : res.Data.User.UserId , FirstName : res.Data.User.FirstName, LastName : res.Data.User.LastName , ProfileImageUrl :  res.Data.User.ProfileImageUrl, ProjectList: res.Data.User.ProjectList, isTokenGenerate: true })
                let userObject = Object.assign({ token: JSON.parse(res.Data.Access_Token)['auth_token'], role: res.Data.User.UserRole }, UserObject);
                DataModel.UserRole = res.Data.User.UserRole;
                if (res.Data.User.UserRole == UserRoles.Admin) {
                    localStorage.setItem('authorization', JSON.stringify(userObject));
                    this.commonServices.load();
                    this.router.navigateByUrl('admin/dashboard');
                }
                else {
                    let selectedProjectId = res.Data.User.ProjectList ? res.Data.User.ProjectList[0].Id : 0;
                    DataModel.ProjectId = selectedProjectId;
                     Object.assign(userObject, { selectedProjectId: selectedProjectId });
                    localStorage.setItem('authorization', JSON.stringify(userObject));
                     this.commonServices.load();
                    this.router.navigate(['/dashboard']);
                   
                }
            }
        })
    }

    LoginAsAdmin() {
        this.coreService.LoginAsAdmin().subscribe(res => {
            window.location.href = res.Data;
        }, (error) => {});
    }
}