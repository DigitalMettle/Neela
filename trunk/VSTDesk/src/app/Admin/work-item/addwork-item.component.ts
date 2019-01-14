import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CkEditorConfig } from './../../common'
import { HeaderService } from '../../core/services/header.sevice';

import { Validations } from './../../common'

@Component({
    selector: 'addwork-item-admin',
    templateUrl: 'addwork-item.component.html'
})

export class WorkItemComponent implements OnInit, OnDestroy {

    public titleEditable: any = true;
    public customerFeedbackEditable: any = true;
    public deatilsEditable: any = true;
    public workItemForm: any;
    public projectId: any;
    public workItemId: number = 0;
    public isNew: boolean = true
    editorConfig: any = CkEditorConfig;
    public subscription: any;
    public headerData: any;

    ngOnInit(): void {

        //set headerData.
        this.setHeaderData();

        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(action => {
            if (action == 'add')
                this.createWorkItem();
        });

        //when form value update update the header data
        this.workItemForm.valueChanges.subscribe(res => {
            this.setHeaderData();
        });

        let that = this;
        let url = this.router.url;
        this.projectId = url.substr((url.lastIndexOf('/') + 1));

        this.activatedRoute.data.subscribe(res => {

            that.isNew = res.isNew;
            let routerData: string[] = this.router.routerState.snapshot.url.split('/');
            if (res.isNew) {
                that.projectId = routerData[3];
            } else {
                that.projectId = routerData[3];
                that.workItemId = Number(routerData[5]);
                this.getWorkItemDetail();
                this.getEditableItems(that.projectId);
            }

        })

    }



    constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private customValidation: Validations, public fb: FormBuilder, private router: Router, private _headerService: HeaderService) {
        this.workItemForm = fb.group({
            Id: [0],
            ProjectId: [''],
            Title: ['', Validators.compose([Validators.required, customValidation.validateNoBlankValues])],
            State: [''],
            Description: [''],
            WorkItemId: [''],
            Comment: [''],
            comments: this.fb.array([])
        });
    }

    initCommentList() {
        return this.fb.group({
            Name: [''],
            Text: [''],
            Date: ['']
        })
    }

    createWorkItem() {
        this.workItemForm.controls['Title'].enable();
        this.workItemForm.patchValue({ Id: this.projectId, WorkItemId: this.workItemId });
        if (this.titleEditable)
            this.workItemForm.value.Title = this.workItemForm.value.Title.trim();
        this.adminService.createWorkItem(this.workItemForm.value, this.projectId).subscribe(res => {
            if (res.Data) {
                this.router.navigateByUrl('/admin/userworkitemlist');
            }
        });
    }

    getWorkItemDetail() {
        this.adminService.getWorkItem(this.projectId, this.workItemId).subscribe(res => {

            if (res) {
                this.workItemForm.patchValue(res.Data);
                let length = res.Data.CommentList.length;
                let control = <FormArray>this.workItemForm.controls['comments'];
                while (length--) {
                    control.push(this.initCommentList());
                }
                this.workItemForm.patchValue({ comments: res.Data.CommentList })
            }
        })

    }

    updateWorkItem() {
        this.workItemForm.patchValue({ Id: this.projectId, WorkItemId: this.workItemId });
        this.adminService.createWorkItem(this.workItemForm.getRawValue(), this.projectId).subscribe(res => {
            if (res.Data) {
                this.router.navigateByUrl('/workitemlist');
            }
        });

    }

    getEditableItems(projectId: any): any {
        let that = this;
        this.adminService.GetEditableItems(projectId).subscribe(res => {
            if (res.Data) {
                this.titleEditable = res.Data.Title;
                this.deatilsEditable = res.Data.Details;
                this.customerFeedbackEditable = res.Data.CustomerFeedback;
                if (!res.Data.Title) {
                    that.workItemForm.controls['Title'].disable();
                }
            }

        });
    }

    setHeaderData() {

        //create Header Data.
        this.headerData = { Title: "WORK ITEM" }
        this.headerData['buttons'] = [{ actionType: 'add', type: "Save", disabled: this.workItemForm.invalid, isIcon: false }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');

    }

}   