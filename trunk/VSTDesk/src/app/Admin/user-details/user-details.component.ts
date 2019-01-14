import { Component, OnInit,OnDestroy } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Validations } from './../../common'
import { HeaderService } from '../../core/services/header.sevice';

@Component({
    selector: 'user-details',
    templateUrl: 'user-details.component.html'
})

export class UserDetailsComponent implements OnInit ,OnDestroy{

    

    id: any = 0;
    userDetails: any;
    public isDisplayProjectList: any = false;
    userProjects: any;
    public subscription: any;
    public headerData: any;

    constructor(private adminService: AdminService, public router: Router, private activatedRoute: ActivatedRoute, private route: Router, private customValidation: Validations, private fb: FormBuilder, private _headerService: HeaderService) {

        this.userDetails = this.fb.group({
            Id:[],
            PhoneNumber: [''],
            FirstName: ['', Validators.compose([Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: [''],
            Projects: this.fb.array([this.initProject()
            ],
                customValidation.multipleCheckboxRequireOne
            )
        })
    }   


    ngOnInit(): void {
        
        //set headerData
        this.setHeaderData();

        //when form value update update the header data
        this.userDetails.valueChanges.subscribe(res => {
            this.setHeaderData();
        });

        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(action => {
            if (action == 'update' && this.userDetails.invalid == false) this.saveUserDeatails();
        });

        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.id = params['Id'];
            this.getUserDetails(this.id); 
        });

       

       
    }

    getUserDetails(userid: any) {
        let that = this;
 
        this.adminService.getUserDetails(this.id).subscribe(res => {
            if (res) {
                //this.userDetails = res.Data;

                if (res.Data.Projects) {
                    let dataLength = res.Data.Projects.length;
                    let formControl = <FormArray>that.userDetails.controls["Projects"];

                    while (--dataLength) {
                        formControl.push(this.initProject());
                    }

                }
                this.userDetails.patchValue(res.Data);
                
            }
        });
    }

    OnChange(e) {
        var isChecked = e.target.checked;
        if (isChecked) {
            this.getProjectsList();
            this.isDisplayProjectList = true;

           }
        else {
           this.isDisplayProjectList = false;
        }

    }

    getProjectsList() {
        
    }

    initProject() {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        })
    }

    saveUserDeatails() {
        this.userDetails.patchValue({ Id: this.id });
        this.userDetails.value.FirstName = this.userDetails.value.FirstName.trim();
        this.userDetails.value.LastName = this.userDetails.value.LastName.trim();
        this.adminService.updateUserDetails(this.userDetails.value).subscribe(res => {
            if (res.Data) {
                //this.router.navigate(['admin/userlist']);
            }
        });
    }

    setHeaderData() {
        debugger    
        //create Header Data.
        this.headerData = { Title: "USER DETAILS" }
        
        this.headerData['buttons'] = [{ actionType: 'update', type: "UPDATE USER",  disabled: this.userDetails.invalid, isIcon: false }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    }
}


