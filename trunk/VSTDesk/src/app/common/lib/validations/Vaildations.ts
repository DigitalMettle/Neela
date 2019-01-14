import { FormControl, FormGroup, ValidatorFn, AbstractControl , FormArray } from "@angular/forms";
import { Injector } from '@angular/core';
import { AdminService } from './../../../Admin'
import { Observable  } from 'rxjs'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/Rx';

export class Validations {
     
    validatePassword(password: FormControl) {

        if (password) {
            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{6,20}/g;
            let inValid = regex.test(password.value);
            if (!inValid) {
                return {
                    passwordFormat: true
                }
            }
            return null
        }
        else {
            return null;
        }
    }

    matchPassword(group: FormGroup) {
        let valid = false;
        let password = group.controls["Password"].value, confirmPassword = group.controls["ConfirmPassword"].value;

        if (password == confirmPassword) {
            return null;
        }
        else {
            return {
                match: true
            };
        }
    }

    validateEmail(email: FormControl) {

        if (email) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
            let inValid = regex.test(email.value);
            if (!inValid) {
                return {
                    emailFormat: true
                }
            }
            return null
        }
        else {
            return null;
        }
    }

    validateNoBlankValues(control: FormControl) {       
        return ((control.value || '').trim().length === 0) ? { blankValidation: true } : null  ;
    }

    validateCharactersOnly(control: FormControl) {
        let regex = /^[a-zA-Z\s]*$/;
        let inValid = regex.test(control.value);
        if (!inValid) {
            return {
                textFormat: true
            }
        }
        return null
    }


    selectOption(control: FormControl) {

        if (control.value === null || control.value ==="") {
             return {
                 option: true
             }
         }
         return null
    }

    multipleCheckboxRequireOne(fa: FormArray) {
        let valid = false;

        let obj = fa.value.find(x => x.IsSelected == true);
        if (obj) {         
                null
        } else {
            return {
                multipleCheckboxRequireOne : true
            }
        }

        
    }


    checkUserEmail(adminService: AdminService): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return new Observable((obs: any) => {
                control
                    .valueChanges
                    .debounceTime(500)
                    .flatMap(value => adminService.isUserEmailExists(control.value))
                    .subscribe(
                    data => {
                        if (data.Data) {
                            obs.next({ isemailexist: true });
                        } else {
                            obs.next(null);
                        }
                        obs.complete();
                    },
                    error => {
                        obs.next({ isemailexist: true });
                        obs.complete();
                    }
                    );
            });
        };
    }


    checkUserName(adminService: AdminService): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return new Observable((obs: any) => {
                control
                    .valueChanges
                    .debounceTime(600)
                    .flatMap(value => adminService.isUserNameExists(control.value))
                    .subscribe(
                    data => {
                        if (data.Data) {
                            obs.next({ isuserExist: true });
                        } else {
                            obs.next(null);
                        }
                        obs.complete();
                    },
                    error => {
                        obs.next({ isuserExist: true });
                        obs.complete();
                    }
                    );
            });
        };
    }

    


}