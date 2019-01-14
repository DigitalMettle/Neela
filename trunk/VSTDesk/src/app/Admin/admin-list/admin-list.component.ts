import {Component } from '@angular/core'
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'admin-list',
    templateUrl: 'admin-list.component.html'
})

export class AdminListComponent {

    adminUserList: any;
    totalAdminUsers: any;

    constructor(private adminService: AdminService) {

    }
    ngOnInit(): void {

        this.adminService.getAdminUserList().subscribe(res => {
            if (res) {
                this.adminUserList = res.Data;
                this.totalAdminUsers = this.adminUserList.length;
            }
        });
    }

}