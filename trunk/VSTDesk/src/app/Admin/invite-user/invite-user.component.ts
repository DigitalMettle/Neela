import { Component, OnInit } from '@angular/core'
import { AdminService } from '../services/admin.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { Validations } from './../../common'


@Component({
    selector: 'invite-user',
    templateUrl: 'invite-user.component.html'
})

export class InviteUserComponent implements OnInit {
    formData: any;
    projectList: any;
    isSendInviteDisable: any = true;
    isInviteSend: any = false;
    isUserExist: any = false;



    constructor(private adminService: AdminService, private fb: FormBuilder, private customValidation: Validations, private router: Router) {
        this.formData = this.fb.group({
            FirstName: ['', Validators.compose([Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: ['',  Validators.compose([Validators.required , customValidation.validateEmail]) , customValidation.checkUserEmail(this.adminService) ],
            Projects: this.fb.array([
            ],
                customValidation.multipleCheckboxRequireOne
            )
        })

    }

    get ProjectList(): FormArray { return this.formData.get('Projects') as FormArray; }

    initProject() {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        })
    }

    ngOnInit(): void {

        this.adminService.getProjectList().subscribe(res => {
            if (res) {
                this.projectList = res.Data;
                let projectCount = res.Data.length;
                let projectControl = <FormArray>this.formData.controls["Projects"];
                for (let i = 0; i < projectCount; i++) {
                    projectControl.push(this.initProject())
                }
                this.formData.patchValue({ Projects: res.Data })
            }
        });

    }
    sendInvite() {      
        if (this.formData.valid) {
            this.formData.value.FirstName = this.formData.value.FirstName.trim();
            this.formData.value.LastName = this.formData.value.LastName.trim();
            this.formData.value.Email = this.formData.value.Email.trim();
            this.adminService.sendInvite(this.formData.value).subscribe(res => {
                this.isInviteSend = res;
                if (res) {
                    this.router.navigate(['/admin/userlist']);
                }
            });
        }
    }

}