import { Component,AfterViewInit, OnDestroy } from '@angular/core'
import {Router} from '@angular/router'
import { UserProfile , CommonServices , UserRoles } from './../../common'
import { HeaderService } from '../services/header.sevice';
import { AdminService } from '../../Admin/services/admin.service';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements AfterViewInit, OnDestroy {
    ngAfterViewInit(): void {
        
        
    }
    openSidebar: boolean = true;
    body: any;
    isShow : boolean = true;
    userProfile = UserProfile;
    headerData: any;
    headerAppName: string;
    headerLogo: string;
    headerValuesSubscription: Subscription;

    constructor(private router: Router, public commonServices: CommonServices, private _headerService: HeaderService, private _adminService: AdminService) {

    }

    

    // Open close sidebar menu
    ngOnInit() {
        let that = this;
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("open-sidebar");
        this.body.classList.add("close-sidebar");

        this.commonServices.userImage$.subscribe(res => {
            if (res != '') {
                that.isShow = false;
                UserProfile.ProfileImageUrl = res;
                this.userProfile = UserProfile;
                setTimeout(function () {
                    that.isShow = true;
                }, 1);
            }
            
        })

        this.commonServices.userProfile$.subscribe(res => {
            if (res['FirstName'] != undefined) {
                UserProfile.FirstName = res['FirstName'];
                UserProfile.LastName = res['LastName'];
            }
            else if (localStorage.getItem('authorization') )
            {
                UserProfile.FirstName = JSON.parse(localStorage.getItem('authorization'))['FirstName'];
                UserProfile.LastName = JSON.parse(localStorage.getItem('authorization'))['LastName'];
            }
            else {
                UserProfile.FirstName = '';
                UserProfile.LastName = '';
            }
            this.userProfile = UserProfile;
        })
         
         this._headerService.ChildChanges$.subscribe(
             res => {
                 this.headerData = res;
            });

        this._adminService.getCompanySettings().subscribe((res) => {
            if (res.Data) {
                this.headerAppName = res.Data.AppName;
                this.headerLogo = res.Data.HeaderLogo;
            }
        })

        this.headerValuesSubscription = this.commonServices.getHeaderValues().subscribe((headerValues) => {
            if (headerValues) {
                this.headerAppName = headerValues.HeaderAppName;
                this.headerLogo = headerValues.HeaderLogo;
            }
        });
 

    }

    sidbarToggle() {
        this.openSidebar = !this.openSidebar;
        if (this.openSidebar) {
            this.body = document.getElementsByTagName('body')[0];
            this.body.classList.remove("open-sidebar");
            this.body.classList.add("close-sidebar");
        } else {
            this.body = document.getElementsByTagName('body')[0];
            this.body.classList.remove("close-sidebar");
            this.body.classList.add("open-sidebar");
        }
    }

    logout() {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('authorization');
            this.router.navigate(['/login'])
        }
       
    }

    navigateToProfile(){
          if(UserProfile.Role == UserRoles.Admin.toString()){
               this.router.navigate(['admin/userprofile'])
          }else{
              this.router.navigate(['userprofile'])
          }
    }

    ngOnDestroy() {
        this.headerValuesSubscription.unsubscribe();
    }
}