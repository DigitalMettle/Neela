import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonServices } from '../services/common.services';
import { FormBuilder, Validators } from '@angular/forms';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, SuccessEvent } from '@progress/kendo-angular-upload';
import { HeaderService } from '../../core/services/header.sevice';
import { Validations } from '../lib/validations/Vaildations';


@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html'
})

export class UserProfileComponent implements OnInit, OnDestroy{
    
    ProPic: any ="UserImages/noimage.gif";
    uploadSaveUrl = "api/user/uploadimage";
    formData: any;
    file: any;
    data: any;
    allowedExtensions: [".jpg", ".png"]
    public uploadRemoveUrl: string = "removeUrl";
    public uploadRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"]
    };

    public resetForm: any;
    public subscription: any;
  

    ngOnInit(): void {
        this.commonService.getUserProfileData().subscribe(res => {
            if (res) {
                this.formData.valueChanges.subscribe((res: any) => { this.setHeaderData() });
                this.formData.patchValue(res.Data);
                if ((res.Data.ProfilePhoto).indexOf('.')>0) {
                    this.ProPic = res.Data.ProfilePhoto;
                }
               
            }

        });

        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(
            data => {
                if (data == 'update') 
                    this.saveUserProfileData();
            })
        document.querySelector('.updatename div span').innerHTML = "UPLOAD OR REPLACE IMAGE";
       
    }

    setHeaderData() {
        //create Header Data.
        let headerData = { Title: "MY PROFILE" }
       
        headerData['buttons'] = [{ actionType: 'update', type: "UPDATE PROFILE", disabled: this.formData.invalid }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(headerData);
    }

    constructor(private fb: FormBuilder, public commonService: CommonServices, private _headerService: HeaderService, private customValidation: Validations) {
        this.formData = this.fb.group({
            UserId: [''],
            FirstName: ['', Validators.compose([Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: [''],
            ProfileImage: [''],
            ProfilePhoto: [''],
            PhoneNumber:['']
        });


        this.resetForm = this.fb.group({
            UserId: [''],
            Password: ['', Validators.compose([Validators.required, Validators.minLength(6), customValidation.validatePassword])],
        });

    }

    successEventHandler(e: SuccessEvent) {
        
        if (e.operation == "upload") {
            this.formData.patchValue({ ProfilePhoto: e.response.body.Data })
            this.ProPic = e.response.body.Data;
            this.commonService.setProfileImage(e.response.body.Data);
            this.commonService.setUserImage(e.response.body.Data);
        }
    }
  
    saveUserProfileData() {
        this.formData.value.FirstName = this.formData.value.FirstName.trim();
        this.formData.value.LastName = this.formData.value.LastName.trim();
        this.commonService.setUserProfileData(this.formData.value).subscribe(res => {
            if (res) {
                this.commonService.setUserProfileHeader(this.formData.value);
                //this.formData = res.Data;
            }

        });
    } 

    togglePassword(tag:any) {
        if (tag.type === "password") 
            tag.type = "text";
        else
            tag.type = "password";
    }
    resetPassword() {
        
        this.commonService.resetPassword(this.resetForm.value).subscribe(res => {
        });
    }




    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    }




}