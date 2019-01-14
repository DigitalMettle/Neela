import { Component, OnInit } from '@angular/core'
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {
    userList: any;
    totalUsers: any;
    searchText: any = '';
    isClient: boolean=true;

    constructor(private adminService: AdminService, public router: Router) {

    }
    ngOnInit(): void {
        this.adminService.getUserList('').subscribe(res => {
            if (res) {
                this.userList = res.Data;
                this.totalUsers = this.userList.length;
            }
        });

    }
    getUserDetails(user: any) {
        this.router.navigate(['/admin/userdetails'], { queryParams: { Id: user.Id } });
    }

    deleteUser(userid: any) {
        var confirmflag = this.deleteConfirm();
        if (confirmflag)
        {
                this.adminService.deleteUser(userid).subscribe(res => {
                if (res) {
                    this.adminService.getUserList('').subscribe(res => {
                        if (res) {
                            this.userList = res.Data;
                            this.totalUsers = this.userList.length;
                        }
                    });
                }
            });
        }
    }

    deleteConfirm() {
        if (confirm("Are you sure you want to delete this user and their associated projects? "))
            return true;
        else 
            return false;
    }

    searchUser() {
        this.adminService.getUserList(this.searchText).subscribe(res => {
            if (res) {
                this.userList = res.Data;
                this.totalUsers = this.userList.length;
            }
        });
        
    }
    toggle(user: any) {

        this.isClient = user == 'admin' ? false : true;
    }


}