import { Component, OnInit } from '@angular/core'
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Validations } from '../../common'
import { HeaderService } from '../../core/services/header.sevice';

@Component({
    selector: 'project-settings',
    templateUrl: 'project-settings.component.html'
})

export class ProjectSettingsComponent implements OnInit {
    public headerData: any;
    public isShow: boolean = false;
    workItemList: any;
    MemberList: any;
    public projectList: any;
    public isDisplaySettings: any = false;
    public data: any;
    public adminSettingForm: any;
    public createdItemsStatus: any = [];
    public subscription: any;
    constructor(private adminService: AdminService, public fb: FormBuilder, private customValidation: Validations, private _headerService:HeaderService) {

    this.createForm();
       
    }

    createForm(){
         this.adminSettingForm = this.fb.group({
            Id: [0],
            ProjectId: [0],
            VSTDeskActive: [true],
            CreatedItemStatus: ['', Validators.compose([Validators.required, this.customValidation.selectOption]) ],
            CreatedItemType: ['', Validators.compose([Validators.required, this.customValidation.selectOption]) ],
            DefaultAssignment: ['', Validators.compose([Validators.required, this.customValidation.selectOption])],
            EditableFields: this.fb.group({
                Title: [false],
                Details: [false],
                CustomerFeedback: [false]
            }),
            WorkItemsList: this.fb.array([]),
            Layout: this.fb.group({
                Flat: [true],
                Hierarchical: [false]
            }),
            GridVisibleFields: this.fb.group({
                WorkItemId : [false],
                WorkItemType: [false],
                Title: [false],
                State:[false]
            }),
            WorkItemsState: this.fb.array([]),
            CustomStatus: this.fb.array([
                this.initCustomStatusData()
            ]),
            MemberList:['']




        });
    }

    initCustomStatusData() {

        return this.fb.group({
            Id: [0],
            projectId: [0],
            StatusName: [''],
            DisplayName: ['', Validators.compose([Validators.required, this.customValidation.validateCharactersOnly])]

        });
    }
    ngOnInit(): void {
        //getting the list of project from the api
        this.adminService.getProjectList().subscribe(res => {if (res)  this.projectList = res.Data;});

        //set header data.
        this.setHeaderData();

        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(action => {
            if (action == 'update' && this.adminSettingForm.invalid == false)
                this.saveProjectSetting();
        });

    }

    get WorkItemList(): FormArray { return this.adminSettingForm.get('WorkItemsList') as FormArray; }
    get WorkItemStateList(): FormArray { return this.adminSettingForm.get('WorkItemsState') as FormArray; }


    initWorkItems() {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        })
    }



    //display panel on project selection
    onSelect(data: any) {
        let headerData;
        if (data != -1) {
            this.isShow = true;
            this.getAdminSettings(data);
            this.isDisplaySettings = true;
        }
        else if (data == -1) {
            this.isDisplaySettings = this.isShow=false;
        }
    }

    getAdminSettings(projectId: any) {
        this.createForm();
        this.adminSettingForm.valueChanges.subscribe((res: any) => {  this.setHeaderData() });
        this.adminService.getAdminSettings(projectId).subscribe(res => {
            if (res) {
                
                this.createdItemsStatus =  res.Data.WorkItemsState;
                let workItemsControls = <FormArray>this.adminSettingForm.controls["WorkItemsList"];
                let lengthofCustomItem = res.Data.WorkItemsList.length;
                while (lengthofCustomItem--) {
                    workItemsControls.push(this.initWorkItems())
                }
                this.adminSettingForm.patchValue({ WorkItemsList: res.Data.WorkItemsList })

                let lengthofCustomItemState = res.Data.WorkItemsState.length;
                let workItemsStateControls = <FormArray>this.adminSettingForm.controls["WorkItemsState"];
                while (lengthofCustomItemState--) {
                    workItemsStateControls.push(this.initWorkItems())
                }
                this.adminSettingForm.patchValue({ WorkItemsState: res.Data.WorkItemsState })

                let dataLength = res.Data.CustomStatus.length;
                let formControl = <FormArray>this.adminSettingForm.controls["CustomStatus"];

                while (--dataLength) {
                    formControl.push(this.initCustomStatusData());
                }
                
                this.adminSettingForm.patchValue({ CustomStatus: res.Data.CustomStatus })
                
                this.adminSettingForm.patchValue({DefaultAssignment : res.Data.DefaultAssignment });
                this.adminSettingForm.patchValue({EditableFields : res.Data.EditableFields});
                this.adminSettingForm.patchValue({VSTDeskActive : res.Data.VSTDeskActive})
                this.adminSettingForm.patchValue({ Layout: res.Data.Layout });
                this.adminSettingForm.patchValue({ Id: res.Data.Id });
                this.adminSettingForm.patchValue({ ProjectId: res.Data.ProjectId });
                this.adminSettingForm.patchValue({ CreatedItemStatus: res.Data.CreatedItemStatus });
                this.adminSettingForm.patchValue({ CreatedItemType: res.Data.CreatedItemType });
                this.adminSettingForm.patchValue({ GridVisibleFields: res.Data.GridVisibleFields });
                this.adminSettingForm.patchValue({ MemberList: res.Data.MemberList });
                this.MemberList = res.Data.MemberList;
                if (this.adminSettingForm.controls["DefaultAssignment"].value == null) {
                    this.adminSettingForm.patchValue({ DefaultAssignment: "" });
                }
                
                this.setHeaderData();
            }

        })
    }

    //saving all the updated project settings to database
    saveProjectSetting() {
        this.adminService.setProjectSetting(this.adminSettingForm.value).subscribe(res => {})
    }

    setradio(data: any) {
        if (data == 0) 
            this.adminSettingForm.controls['Layout'].patchValue({ Flat: false, Hierarchical: true });
        else 
            this.adminSettingForm.controls['Layout'].patchValue({ Flat: true, Hierarchical: false });
    }

    setHeaderData() {

        //create Header Data.
        this.headerData = { Title: "PROJECT SETTINGS" }
        if (this.isShow)
            this.headerData['buttons'] = [{ actionType: 'update', type: "UPDATE SETTINGS", disabled: this.adminSettingForm.invalid, isIcon: false }];
        else
            this.headerData['buttons'] = undefined;

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);   
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    }
}