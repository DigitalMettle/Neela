import { Component, OnInit,Output,EventEmitter,OnDestroy} from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, SuccessEvent } from '@progress/kendo-angular-upload';
import { HeaderService } from '../../core/services/header.sevice';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { CkEditorConfig, CommonServices } from './../../common'
import { Subject } from 'rxjs';
import { strictEqual } from 'assert';
import { debug } from 'util';
//import { FormControl } from '@angular/forms/src/model';
//import { Validators } from '@angular/forms/src/validators';

@Component({
    selector: "company-settings",
    templateUrl: "company-settings.component.html"
})

export class CompanySettingsComponent implements OnInit{

    profileImageUploadUrl = "api/account/uploadimage?type=profileimage"
    backgroundImageForLoginUploadUrl = "api/account/uploadimage?type=backgroundimage";
    headerLogoUploadUrl = "api/account/uploadimage?type=headerlogo";

    public companyMessage: any;
    formData: any;
    subscription: any;
    public tooltip: any;
    public headerData: any;
    editorConfig: any = CkEditorConfig;

    ngOnInit(): void {
        
        let content = document.getElementsByClassName('updatename');
        for (let i = 0; i < content.length; i++) {
            content[i].querySelector('.updatename div span').innerHTML = "UPLOAD OR REPLACE IMAGE";
        }
        this.getCompanySettings();

        //set the header data of the page.
        this.setHeaderData();

        //when form value update update the header data
        this.formData.valueChanges.subscribe(res => {
            this.setHeaderData();
        });

        this.subscription = this._headerService.headerChanges$.subscribe(action => {
            if (action == 'update')
                this.saveCompanySettings();

        });
        
    }


    constructor(private _adminService: AdminService, private fb: FormBuilder, private _headerService: HeaderService, private _commonService: CommonServices) {
        this.formData = this.fb.group({
            AppName: ['', Validators.compose([Validators.required])],
            CompanyLogo: [null],
            BackgroundImageUrlForLogin: [null],
            PersonalAccessToken: ['', Validators.compose([Validators.required])],
            SettingOne: ['', Validators.compose([Validators.required])],
            SettingTwo: ['', Validators.compose([Validators.required])], 
            SMTPFromEmail: ['', Validators.compose([Validators.required])],
            SMTPFromName: ['', Validators.compose([Validators.required])],
            SMTPHostUrl: ['', Validators.compose([Validators.required])],
            SMTPPort: ['', Validators.compose([Validators.required])],
            EncryptionType: ['', Validators.compose([Validators.required])],
            SMTPAuthentication: ['', Validators.compose([Validators.required])],
            SMTPUserName: ['', Validators.compose([Validators.required])],
            SMTPPassword: ['', Validators.compose([Validators.required])],
            InvitationEmailSubject: ['', Validators.compose([Validators.required])],
            InvitationEmailMessage: ['', Validators.compose([Validators.required])],
            PasswordResetEmailSubject: ['', Validators.compose([Validators.required])],
            PasswordResetEmailMessage: ['', Validators.compose([Validators.required])],
            HeaderLogo : [null]
        });
    }

    saveCompanySettings() {
        this._adminService.setCompanySettings(this.formData.value)
            .subscribe();

        //if (this.formData.controls["AppName"].touched && this.formData.controls["AppName"].dirty)
        this._commonService.setHeaderValues({
            HeaderLogo: this.formData.controls["HeaderLogo"].value,
            HeaderAppName: this.formData.controls["AppName"].value
        });  
    }

    getCompanySettings() {
        this._adminService.getCompanySettings()
            .subscribe(res => {
                if (res.Data) {
                    this.formData.patchValue({ AppName: res.Data.AppName });
                    this.formData.patchValue({ CompanyLogo: res.Data.CompanyLogo });
                    this.formData.patchValue({ BackgroundImageUrlForLogin: res.Data.BackgroundImageUrlForLogin });
                    this.formData.patchValue({ PersonalAccessToken: res.Data.PersonalAccessToken });
                    this.formData.patchValue({ SettingOne: res.Data.SettingOne });
                    this.formData.patchValue({ SettingTwo: res.Data.SettingTwo });
                    this.formData.patchValue({ SMTPFromEmail: res.Data.SMTPFromEmail });
                    this.formData.patchValue({ SMTPFromName: res.Data.SMTPFromName });
                    this.formData.patchValue({ SMTPHostUrl: res.Data.SMTPHostUrl });
                    this.formData.patchValue({ SMTPPort: res.Data.SMTPPort });
                    this.formData.patchValue({ EncryptionType: res.Data.EncryptionType });
                    this.formData.patchValue({ SMTPAuthentication: res.Data.SMTPAuthentication });
                    this.formData.patchValue({ SMTPUserName: res.Data.SMTPUserName });
                    this.formData.patchValue({ SMTPPassword: res.Data.SMTPPassword });
                    this.formData.patchValue({ InvitationEmailSubject: res.Data.InvitationEmailSubject });
                    this.formData.patchValue({ InvitationEmailMessage: res.Data.InvitationEmailMessage });
                    this.formData.patchValue({ PasswordResetEmailSubject: res.Data.PasswordResetEmailSubject });
                    this.formData.patchValue({ PasswordResetEmailMessage: res.Data.PasswordResetEmailMessage });
                    this.formData.patchValue({ HeaderLogo: res.Data.HeaderLogo});
                }
            });
    }

    uploadLogoSuccessEventHandler(e: SuccessEvent) {
        if (e.operation == "upload") {
            this.formData.patchValue({ CompanyLogo: e.response.body.Data });
        }
    }

    loginImageSuccessEventHandler(e: SuccessEvent) {
        if (e.operation == "upload") {
            this.formData.patchValue({ BackgroundImageUrlForLogin: e.response.body.Data });
        }
    }

    uploadHeaderLogoSuccessEventHandler(e: SuccessEvent) {
        debugger
        if (e.operation == "upload") {
            this.formData.patchValue({ HeaderLogo: e.response.body.Data });
        }
    }
    setHeaderData() {

        //create Header Data.
        this.headerData = { Title: "Company Settings" }
        this.headerData['buttons'] = [{ actionType: 'update', type: "Update Settings", disabled: this.formData.invalid, isIcon: false }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    }
    ngOnDestroy() {
        this._headerService.emitChildChanges('');
        this.subscription.unsubscribe();
       

    }

    toggleElement(element: HTMLDivElement) {
        if (element) {
            element.hidden = !element.hidden;
        }
    }

}