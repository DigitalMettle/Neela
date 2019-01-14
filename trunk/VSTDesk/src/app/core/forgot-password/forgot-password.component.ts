import { Component } from '@angular/core';
import { CoreService } from '../services/core.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Validations } from '../../common'
declare var jquery: any;
declare var $: any;


@Component({
    selector: 'forgot-password',
    templateUrl: 'forgot-password.component.html'
})

export class ForgotPassword {
    body: any;
    public isUserNameValid: any = false;
    forgotPasswordForm: FormGroup;
    BackgroundImageUrlForLogin: any = "";
    constructor(private coreService: CoreService, public fb: FormBuilder, private customValidation: Validations, private router: Router) {
        this.forgotPasswordForm = this.fb.group({
            Username: ['', Validators.compose([Validators.required, customValidation.validateEmail])],
        })
    }

    forgotPassword() {
        this.coreService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe(res => {
            this.isUserNameValid = res;
            if (res) {
                this.router.navigate(['/login']);
            }
        })
    }

    getCompanySettings() {
        this.coreService.getCompanySettings()
            .subscribe(res => {
                if (res.Data) {

                    this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                    $('body').css({ 'background-image': 'url(' + this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat' });
                }
            });
    }

    ngOnInit() {
        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    }

    // Remove class from body tag
    ngOnDestroy() {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    }
}