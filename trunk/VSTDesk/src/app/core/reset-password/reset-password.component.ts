import { Component , OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validations } from '../../common';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent implements  OnInit {
    
    body: any;
    resetPasswordForm: FormGroup;
    token: any;
    userId: any;
    isSuccess: any = false;
    BackgroundImageUrlForLogin: any = "";
    

    constructor(private coreService: CoreService, public fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private customValidation: Validations) {
        this.resetPasswordForm = this.fb.group({
            UserId: [''],
            Password: ['', Validators.compose([Validators.required, Validators.minLength(6), customValidation.validatePassword])],
            ConfirmPassword: ['', Validators.required],
            Token:['']
        }, { validator: customValidation.matchPassword })
       

    }
    

    ngOnInit(): void {
        
        // subscribe to router event
        this.activatedRoute.queryParams .subscribe((params: Params) => {
            this.token = params['token'];
            this.userId = params['userId'];
           
        });

        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    }
    getCompanySettings() {
        this.coreService.getCompanySettings()
            .subscribe(res => {
                if (res.Data) {
                  ;
                    this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                    $('body').css({ 'background-image': 'url(' + this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat' });
                }
            });
    }

    // Remove class from body tag
    ngOnDestroy() {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    }

    resetPassword() {

        this.resetPasswordForm.patchValue({ Token: this.token, UserId:this.userId});
        this.coreService.resetPassword(this.resetPasswordForm.value).subscribe(res => {
              if(res){
                  this.router.navigate(['/login'])
              }
        })
       
    }
   


}