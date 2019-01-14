webpackJsonp(["core.module"],{

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var core_routes_1 = __webpack_require__("../../../../../src/app/core/core.routes.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var common_2 = __webpack_require__("../../../../../src/app/common/index.ts");
var index_1 = __webpack_require__("../../../../../src/app/core/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var sub_header_component_1 = __webpack_require__("../../../../../src/app/core/sub-header/sub-header.component.ts");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [core_routes_1.CoreRouteModule, forms_1.ReactiveFormsModule, common_1.CommonModule, common_2.CommonCustomModule],
            declarations: [index_1.LoginComponent, index_1.ForgotPassword, index_1.ResetPasswordComponent, index_1.TFSTokenComponent, index_1.HeaderComponent, index_1.CreatePasswordComponent, sub_header_component_1.NewHeaderComponent],
            exports: [],
            providers: [index_1.CoreService, header_sevice_1.HeaderService]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;


/***/ }),

/***/ "../../../../../src/app/core/core.routes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var index_1 = __webpack_require__("../../../../../src/app/core/index.ts");
var routes = [
    { path: 'login', component: index_1.LoginComponent, canActivate: [common_1.LoginAuthGuard] },
    { path: 'add-password', component: index_1.CreatePasswordComponent },
    { path: 'forgot-password', component: index_1.ForgotPassword },
    { path: 'oauth/callback', component: index_1.TFSTokenComponent },
    { path: 'reset-password', component: index_1.ResetPasswordComponent },
    {
        path: '', component: index_1.HeaderComponent,
        children: [
            { path: '', loadChildren: '../Customer/customer.module#CustomerModule', canActivate: [common_1.LoginAuthGuard, common_1.PermissionAuthGuard] },
            { path: 'admin', loadChildren: '../Admin/admin.module#AdminModule', canActivate: [common_1.LoginAuthGuard, common_1.PermissionAuthGuard] }
        ]
    }
];
var CoreRouteModule = /** @class */ (function () {
    function CoreRouteModule() {
    }
    CoreRouteModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], CoreRouteModule);
    return CoreRouteModule;
}());
exports.CoreRouteModule = CoreRouteModule;


/***/ }),

/***/ "../../../../../src/app/core/create-password/create-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container container-account\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-md-10 col-lg-5\">\r\n            <div class=\"card-group\">\r\n                <div class=\"card p-4\">\r\n                    <div class=\"card-body\">\r\n                        <h1 >{{'CoreModule.Label.Create' | translate}}</h1>\r\n                        <div [formGroup]=\"addPasswordForm\">\r\n                            <div class=\"form-group\">\r\n                                <input [ngClass]=\"{'is-invalid':addPasswordForm.get('Password').touched && addPasswordForm.get('Password').invalid }\" formControlName=\"Password\" placeholder=\"{{'CoreModule.Placeholder.Password' | translate}}\" class=\"form-control\" type=\"password\">\r\n                                <div class=\"form-text text-danger\" *ngIf=\"addPasswordForm.get('Password').touched && addPasswordForm.get('Password').hasError('required')\">{{'CoreModule.Validations.Required' | translate}}</div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"!addPasswordForm.get('Password').hasError('required')&& addPasswordForm.get('Password').touched && addPasswordForm.get('Password').hasError('passwordFormat')\">{{'CoreModule.Validations.PasswordFormat' | translate}}</div>\r\n\r\n                            </div>\r\n                           \r\n                            <div class=\"form-group\">\r\n                                <input [ngClass]=\"{'is-invalid':addPasswordForm.get('ConfirmPassword').touched && addPasswordForm.get('ConfirmPassword').invalid }\" formControlName=\"ConfirmPassword\" placeholder=\"{{'CoreModule.Placeholder.ConfirmPassword' | translate}}\" class=\"form-control\" type=\"password\">\r\n                                <div class=\"form-text text-danger\" *ngIf=\"addPasswordForm.get('ConfirmPassword').touched && addPasswordForm.get('ConfirmPassword').hasError('required')\">{{'CoreModule.Validations.Required' | translate}}</div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"!addPasswordForm.get('ConfirmPassword').hasError('required')&&addPasswordForm.hasError('match') \">{{'CoreModule.Validations.MatchPassword' | translate}}</div>\r\n                            </div>\r\n                            \r\n                            <div>\r\n                                <button class=\"btn btn-primary btn-block\" [disabled]=\"addPasswordForm.invalid\"  (click)=\"createPassword()\">{{'CoreModule.Button.Create' | translate}}</button>\r\n                            </div>\r\n                        </div>                       \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/create-password/create-password.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var CreatePasswordComponent = /** @class */ (function () {
    function CreatePasswordComponent(coreService, fb, activatedRoute, router, customValidation) {
        this.coreService = coreService;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.customValidation = customValidation;
        this.BackgroundImageUrlForLogin = "";
        this.addPasswordForm = this.fb.group({
            Password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), customValidation.validatePassword])],
            ConfirmPassword: ['', forms_1.Validators.required],
            UserId: [this.id],
        }, { validator: customValidation.matchPassword });
    }
    CreatePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = params['userId'];
            _this.addPasswordForm.patchValue({ UserId: _this.id });
        });
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    };
    CreatePasswordComponent.prototype.createPassword = function () {
        var _this = this;
        this.coreService.createPassword(this.addPasswordForm.value).subscribe(function (res) {
            if (res.Data) {
                _this.router.navigateByUrl('/login');
            }
        });
    };
    CreatePasswordComponent.prototype.getCompanySettings = function () {
        var _this = this;
        this.coreService.getCompanySettings()
            .subscribe(function (res) {
            if (res.Data) {
                _this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                $('body').css({ 'background-image': 'url(' + _this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat' });
            }
        });
    };
    // Remove class from body tag
    CreatePasswordComponent.prototype.ngOnDestroy = function () {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    };
    CreatePasswordComponent = __decorate([
        core_1.Component({
            selector: 'create-password',
            template: __webpack_require__("../../../../../src/app/core/create-password/create-password.component.html")
        }),
        __metadata("design:paramtypes", [core_service_1.CoreService, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, common_1.Validations])
    ], CreatePasswordComponent);
    return CreatePasswordComponent;
}());
exports.CreatePasswordComponent = CreatePasswordComponent;


/***/ }),

/***/ "../../../../../src/app/core/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container container-account\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-md-10 col-lg-5\">\r\n            <div class=\"card-group\">\r\n                <div class=\"card p-4\">\r\n                    <div *ngIf=\"!isUserNameValid\" class=\"card-body\" [formGroup]=\"forgotPasswordForm\">\r\n                        <h1>{{'CoreModule.Label.ForgotPassword' | translate}}</h1>\r\n                        <p>{{'CoreModule.Label.ResetPassword' | translate}}</p>\r\n                        <div class=\"form-group\">\r\n                            <input [ngClass]=\"{'is-invalid' : forgotPasswordForm.get('Username').touched && forgotPasswordForm.get('Username').hasError('required') || !forgotPasswordForm.get('Username').hasError('required') && forgotPasswordForm.get('Username').hasError('emailFormat')}\" formControlName=\"Username\" placeholder=\"{{'CoreModule.Placeholder.EmailAddress' | translate}}\" class=\"form-control\" type=\"email\">\r\n                            <div class=\"form-text text-danger\" *ngIf=\"forgotPasswordForm.get('Username').touched && forgotPasswordForm.get('Username').hasError('required')\">{{'CoreModule.Validations.Required' | translate}}</div>\r\n                            <div class=\"form-text text-danger\" *ngIf=\"!forgotPasswordForm.get('Username').hasError('required') && forgotPasswordForm.get('Username').hasError('emailFormat') \">{{'CoreModule.Validations.EmailFormat' | translate}}</div>\r\n                        </div>\r\n                        \r\n                        <div>\r\n                            <input class=\"btn btn-primary btn-block\" [disabled]=\"forgotPasswordForm.invalid\" value=\"{{'CoreModule.Button.Reset' | translate}}\" (click)=\"forgotPassword()\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">\r\n                        </div>\r\n                        <div class=\"col-6 text-right\">\r\n                            <a class=\"btn-link px-0\" routerLink=\"/login\">{{'CoreModule.Button.Continue' | translate}}</a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/forgot-password/forgot-password.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var ForgotPassword = /** @class */ (function () {
    function ForgotPassword(coreService, fb, customValidation, router) {
        this.coreService = coreService;
        this.fb = fb;
        this.customValidation = customValidation;
        this.router = router;
        this.isUserNameValid = false;
        this.BackgroundImageUrlForLogin = "";
        this.forgotPasswordForm = this.fb.group({
            Username: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateEmail])],
        });
    }
    ForgotPassword.prototype.forgotPassword = function () {
        var _this = this;
        this.coreService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe(function (res) {
            _this.isUserNameValid = res;
            if (res) {
                _this.router.navigate(['/login']);
            }
        });
    };
    ForgotPassword.prototype.getCompanySettings = function () {
        var _this = this;
        this.coreService.getCompanySettings()
            .subscribe(function (res) {
            if (res.Data) {
                _this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                $('body').css({ 'background-image': 'url(' + _this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat' });
            }
        });
    };
    ForgotPassword.prototype.ngOnInit = function () {
        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    };
    // Remove class from body tag
    ForgotPassword.prototype.ngOnDestroy = function () {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    };
    ForgotPassword = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            template: __webpack_require__("../../../../../src/app/core/forgot-password/forgot-password.component.html")
        }),
        __metadata("design:paramtypes", [core_service_1.CoreService, forms_1.FormBuilder, common_1.Validations, router_1.Router])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;


/***/ }),

/***/ "../../../../../src/app/core/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-main-container\">\r\n    <nav class=\"app-header\">\r\n        <div class=\"container-fluid\">\r\n            <div class=\"header-left\">\r\n                <div class=\"brand-containter\">\r\n                    <div class=\"logo-secondary\">\r\n                        <img src=\"{{headerLogo}}\" class=\"img-responsive\" />\r\n                    </div>\r\n                    <div class=\"logo\"><span>{{headerAppName}}</span></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"header-right\">\r\n                <ul class=\"nav\">\r\n                    <li class=\"nav-items-user-info\">\r\n                        <a  href=\"javascript:void(0)\">\r\n                            <span *ngIf=\"isShow\" class=\"user-picture\" [ngStyle]=\"{'background-image': 'url(' + userProfile.ProfileImageUrl + ')'}\"></span>\r\n                            <span class=\"user-name hidden-xs\">{{userProfile.FirstName}} {{userProfile.LastName}}</span>\r\n                            <i class=\"material-icons\">expand_more</i>\r\n                        </a>\r\n                        <ul class=\"user-profile-dropdown\">\r\n                            <li *ngIf=\"userProfile.Role!='Admin'\"><a href=\"javascript:void(0)\" (click)=\"navigateToProfile()\"><i class=\"material-icons\">account_circle</i>My Profile</a>\r\n                            <li><a (click)=\"logout()\" href=\"javascript:void(0)\"><i class=\"material-icons\">power_settings_new</i> Log Out</a></li>\r\n                        </ul>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n    <div class=\"app-sub-header\">\r\n        <div class=\"container-fluid\">\r\n            <div class=\"side-menu-toggle-button\">\r\n                <button type=\"button\" class=\"navigation\" (click)=\"sidbarToggle()\">\r\n                    <span></span>\r\n                    <span></span>\r\n                    <span></span>\r\n                </button>\r\n                <span>MENU</span>\r\n            </div>\r\n            <subheader class=\"right-block-holder\" [headerData]=\"headerData\"></subheader>\r\n        </div>\r\n    </div>\r\n    <app-sidenav></app-sidenav>\r\n    <div class=\"content\">\r\n        <main class=\"app-main-content\">\r\n            <router-outlet></router-outlet>\r\n        </main>\r\n        <!--<app-footer></app-footer>-->\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, commonServices, _headerService, _adminService) {
        this.router = router;
        this.commonServices = commonServices;
        this._headerService = _headerService;
        this._adminService = _adminService;
        this.openSidebar = true;
        this.isShow = true;
        this.userProfile = common_1.UserProfile;
    }
    HeaderComponent.prototype.ngAfterViewInit = function () {
    };
    // Open close sidebar menu
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var that = this;
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("open-sidebar");
        this.body.classList.add("close-sidebar");
        this.commonServices.userImage$.subscribe(function (res) {
            if (res != '') {
                that.isShow = false;
                common_1.UserProfile.ProfileImageUrl = res;
                _this.userProfile = common_1.UserProfile;
                setTimeout(function () {
                    that.isShow = true;
                }, 1);
            }
        });
        this.commonServices.userProfile$.subscribe(function (res) {
            if (res['FirstName'] != undefined) {
                common_1.UserProfile.FirstName = res['FirstName'];
                common_1.UserProfile.LastName = res['LastName'];
            }
            else if (localStorage.getItem('authorization')) {
                common_1.UserProfile.FirstName = JSON.parse(localStorage.getItem('authorization'))['FirstName'];
                common_1.UserProfile.LastName = JSON.parse(localStorage.getItem('authorization'))['LastName'];
            }
            else {
                common_1.UserProfile.FirstName = '';
                common_1.UserProfile.LastName = '';
            }
            _this.userProfile = common_1.UserProfile;
        });
        this._headerService.ChildChanges$.subscribe(function (res) {
            _this.headerData = res;
        });
        this._adminService.getCompanySettings().subscribe(function (res) {
            if (res.Data) {
                _this.headerAppName = res.Data.AppName;
                _this.headerLogo = res.Data.HeaderLogo;
            }
        });
        this.headerValuesSubscription = this.commonServices.getHeaderValues().subscribe(function (headerValues) {
            if (headerValues) {
                _this.headerAppName = headerValues.HeaderAppName;
                _this.headerLogo = headerValues.HeaderLogo;
            }
        });
    };
    HeaderComponent.prototype.sidbarToggle = function () {
        this.openSidebar = !this.openSidebar;
        if (this.openSidebar) {
            this.body = document.getElementsByTagName('body')[0];
            this.body.classList.remove("open-sidebar");
            this.body.classList.add("close-sidebar");
        }
        else {
            this.body = document.getElementsByTagName('body')[0];
            this.body.classList.remove("close-sidebar");
            this.body.classList.add("open-sidebar");
        }
    };
    HeaderComponent.prototype.logout = function () {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('authorization');
            this.router.navigate(['/login']);
        }
    };
    HeaderComponent.prototype.navigateToProfile = function () {
        if (common_1.UserProfile.Role == common_1.UserRoles.Admin.toString()) {
            this.router.navigate(['admin/userprofile']);
        }
        else {
            this.router.navigate(['userprofile']);
        }
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.headerValuesSubscription.unsubscribe();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/core/header/header.component.html")
        }),
        __metadata("design:paramtypes", [router_1.Router, common_1.CommonServices, header_sevice_1.HeaderService, admin_service_1.AdminService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ }),

/***/ "../../../../../src/app/core/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = __webpack_require__("../../../../../src/app/core/login/login.component.ts");
exports.LoginComponent = login_component_1.LoginComponent;
var forgot_password_component_1 = __webpack_require__("../../../../../src/app/core/forgot-password/forgot-password.component.ts");
exports.ForgotPassword = forgot_password_component_1.ForgotPassword;
var reset_password_component_1 = __webpack_require__("../../../../../src/app/core/reset-password/reset-password.component.ts");
exports.ResetPasswordComponent = reset_password_component_1.ResetPasswordComponent;
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
exports.CoreService = core_service_1.CoreService;
var tfs_token_1 = __webpack_require__("../../../../../src/app/core/vsts-token/tfs-token.ts");
exports.TFSTokenComponent = tfs_token_1.TFSTokenComponent;
var header_component_1 = __webpack_require__("../../../../../src/app/core/header/header.component.ts");
exports.HeaderComponent = header_component_1.HeaderComponent;
var create_password_component_1 = __webpack_require__("../../../../../src/app/core/create-password/create-password.component.ts");
exports.CreatePasswordComponent = create_password_component_1.CreatePasswordComponent;


/***/ }),

/***/ "../../../../../src/app/core/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container container-account\">\r\n    <div class=\"row justify-content-center\">\r\n    \r\n        <div class=\"col-lg-8 col-md-12\">\r\n            <div class=\"card-group\">\r\n                <div class=\"card p-4\">\r\n                    <div class=\"card-body\">\r\n                        <h1>{{'CoreModule.Label.Login' | translate}}</h1>\r\n                        <p>{{'CoreModule.Label.SignIn' | translate}} </p>\r\n\r\n                        <form class=\"login-form\" [formGroup]=\"loginForm\" (submit)=\"doLogin()\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"Username\" placeholder=\"{{'CoreModule.Placeholder.UserName' | translate}}\">\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input type=\"password\" class=\"form-control\" formControlName=\"Password\" placeholder=\"{{'CoreModule.Placeholder.Password' | translate}}\">\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <a class=\"btn btn-link px-0\" routerLink=\"/forgot-password\">{{'CoreModule.Button.ForgotPassword' | translate}}</a>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col\">\r\n                                    <button type=\"submit\" class=\"btn btn-primary\">{{'CoreModule.Button.Login' | translate}}</button>\r\n                                </div>\r\n\r\n                                <div class=\"col text-right\">\r\n                                    <button class=\"btn btn-primary\"  type=\"button\" (click)=\"LoginAsAdmin()\">{{'CoreModule.Button.LoginAsAdmin' | translate}}</button>\r\n                                    \r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <!--<div class=\"col-6\">\r\n                        <button class=\"btn btn-primary px-4\" (click)=\"LoginAsAdmin()\">{{'CoreModule.Button.LoginAsAdmin' | translate}}</button>\r\n                    </div>-->\r\n                </div>\r\n\r\n                <div class=\"card v-divider text-white py-2 d-md-down-none\">\r\n                    <div class=\"card-body d-flex align-items-center text-center justify-content-center\">\r\n                        <div>\r\n                            <img src=\"{{CompanyPic}}\" class=\"img-thumbnail\" alt=\"Company Image\"  />\r\n                           \r\n                            <p class=\"py-2\">{{CompanyMessage}}</p>\r\n                          \r\n                            <!--<a  class=\"btn btn-link px-0 active\" routerlink=\"/forgot-password\">Reset password</a>-->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        \r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(coreService, fb, router, commonServices) {
        this.coreService = coreService;
        this.fb = fb;
        this.router = router;
        this.commonServices = commonServices;
        this.BackgroundImageUrlForLogin = "";
        this.loginForm = this.fb.group({
            Username: [''],
            Password: ['']
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    };
    // Remove class from body tag
    LoginComponent.prototype.ngOnDestroy = function () {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    };
    LoginComponent.prototype.getCompanySettings = function () {
        var _this = this;
        this.coreService.getCompanySettings()
            .subscribe(function (res) {
            if (res.Data) {
                _this.CompanyPic = res.Data.CompanyLogo;
                _this.CompanyMessage = res.Data.CompanyMessage;
                _this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                $('body').css({ 'background-image': 'url(' + _this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover' });
            }
        });
    };
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        this.coreService.login(this.loginForm.value).subscribe(function (res) {
            if (res) {
                var UserObject = Object.assign({ Username: res.Data.User.Username, UserId: res.Data.User.UserId, FirstName: res.Data.User.FirstName, LastName: res.Data.User.LastName, ProfileImageUrl: res.Data.User.ProfileImageUrl, ProjectList: res.Data.User.ProjectList, isTokenGenerate: true });
                var userObject = Object.assign({ token: JSON.parse(res.Data.Access_Token)['auth_token'], role: res.Data.User.UserRole }, UserObject);
                common_1.DataModel.UserRole = res.Data.User.UserRole;
                if (res.Data.User.UserRole == common_1.UserRoles.Admin) {
                    localStorage.setItem('authorization', JSON.stringify(userObject));
                    _this.commonServices.load();
                    _this.router.navigateByUrl('admin/dashboard');
                }
                else {
                    var selectedProjectId = res.Data.User.ProjectList ? res.Data.User.ProjectList[0].Id : 0;
                    common_1.DataModel.ProjectId = selectedProjectId;
                    Object.assign(userObject, { selectedProjectId: selectedProjectId });
                    localStorage.setItem('authorization', JSON.stringify(userObject));
                    _this.commonServices.load();
                    _this.router.navigate(['/dashboard']);
                }
            }
        });
    };
    LoginComponent.prototype.LoginAsAdmin = function () {
        this.coreService.LoginAsAdmin().subscribe(function (res) {
            window.location.href = res.Data;
        }, function (error) { });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/core/login/login.component.html")
        }),
        __metadata("design:paramtypes", [core_service_1.CoreService, forms_1.FormBuilder, router_1.Router, common_1.CommonServices])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/core/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container container-account\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-md-10 col-lg-5\">\r\n            <div class=\"card-group\">\r\n                <div class=\"card p-4\">\r\n                    <div class=\"card-body\">\r\n                        <h1>{{'CoreModule.Label.Reset' | translate}}</h1>\r\n                        <p>{{'CoreModule.Label.NewPassword' | translate}}</p>\r\n\r\n                        <div [formGroup]=\"resetPasswordForm\">\r\n\r\n                            <div class=\"form-group\">\r\n                                <input [ngClass]=\"{'is-invalid' : resetPasswordForm.controls['Password'].touched && resetPasswordForm.controls['Password'].invalid}\" formControlName=\"Password\" placeholder=\"{{'CoreModule.Placeholder.Password' | translate}}\" class=\"form-control\" type=\"password\">\r\n                                <div class=\"form-text text-danger\" *ngIf=\"resetPasswordForm.controls['Password'].touched && resetPasswordForm.controls['Password'].hasError('required')\">\r\n                                    {{'CoreModule.Validations.PasswordRequired' | translate}}\r\n                                </div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"!resetPasswordForm.controls['Password'].hasError('required') && resetPasswordForm.controls['Password'].touched && resetPasswordForm.controls['Password'].hasError('passwordFormat')\">\r\n                                    {{'CoreModule.Validations.PasswordFormat' | translate}}\r\n                                </div>\r\n                            </div>\r\n                            \r\n\r\n                            <div class=\"form-group\">\r\n                                <input [ngClass]=\"{'is-invalid' : resetPasswordForm.controls['ConfirmPassword'].touched && resetPasswordForm.controls['ConfirmPassword'].invalid}\" formControlName=\"ConfirmPassword\" placeholder=\"{{'CoreModule.Placeholder.ConfirmPassword' | translate}}\" class=\"form-control\" type=\"password\">\r\n                                <div class=\"form-text text-danger\" *ngIf=\"resetPasswordForm.controls['ConfirmPassword'].touched && resetPasswordForm.controls['ConfirmPassword'].hasError('required')\">\r\n                                    {{'CoreModule.Validations.Required' | translate}}\r\n                                </div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"resetPasswordForm.controls['ConfirmPassword'].touched && !resetPasswordForm.controls['ConfirmPassword'].hasError('required') && resetPasswordForm.hasError('match') \">\r\n                                    {{'CoreModule.Validations.MatchPassword' | translate}}\r\n                                </div>\r\n                            </div>\r\n                           \r\n                            <div>\r\n                                <input class=\"btn btn-primary btn-block\" [disabled]=\"resetPasswordForm.invalid\" value=\"{{'CoreModule.Button.Reset' | translate}}\" (click)=\"resetPassword()\">\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/reset-password/reset-password.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(coreService, fb, activatedRoute, router, customValidation) {
        this.coreService = coreService;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.customValidation = customValidation;
        this.isSuccess = false;
        this.BackgroundImageUrlForLogin = "";
        this.resetPasswordForm = this.fb.group({
            UserId: [''],
            Password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), customValidation.validatePassword])],
            ConfirmPassword: ['', forms_1.Validators.required],
            Token: ['']
        }, { validator: customValidation.matchPassword });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.token = params['token'];
            _this.userId = params['userId'];
        });
        // Add class in body tag
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add("account-theme");
        this.getCompanySettings();
    };
    ResetPasswordComponent.prototype.getCompanySettings = function () {
        var _this = this;
        this.coreService.getCompanySettings()
            .subscribe(function (res) {
            if (res.Data) {
                ;
                _this.BackgroundImageUrlForLogin = res.Data.BackgroundImageUrlForLogin;
                $('body').css({ 'background-image': 'url(' + _this.BackgroundImageUrlForLogin + ')', 'background-repeat': 'no-repeat' });
            }
        });
    };
    // Remove class from body tag
    ResetPasswordComponent.prototype.ngOnDestroy = function () {
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.remove("account-theme");
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.resetPasswordForm.patchValue({ Token: this.token, UserId: this.userId });
        this.coreService.resetPassword(this.resetPasswordForm.value).subscribe(function (res) {
            if (res) {
                _this.router.navigate(['/login']);
            }
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'reset-password',
            template: __webpack_require__("../../../../../src/app/core/reset-password/reset-password.component.html")
        }),
        __metadata("design:paramtypes", [core_service_1.CoreService, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, common_1.Validations])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;


/***/ }),

/***/ "../../../../../src/app/core/services/core.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var CoreService = /** @class */ (function () {
    function CoreService(http) {
        this.http = http;
    }
    CoreService.prototype.login = function (data) {
        var body = "username=" + data.Username + "&password=" + encodeURIComponent(data.Password);
        return this.http.post('/token', body);
    };
    CoreService.prototype.sendForgotPasswordLink = function (data) {
        return this.http.post('/api/account/sendpasswordresetlink?username=' + data.Username, data);
    };
    CoreService.prototype.resetPassword = function (data) {
        return this.http.post('/api/account/resetPassword', data);
    };
    CoreService.prototype.generateToken = function (data) {
        return this.http.post('/api/account/generatetfstoken', data);
    };
    CoreService.prototype.createPassword = function (data) {
        return this.http.post('/api/account/createuserPassword', data);
    };
    CoreService.prototype.getCompanySettings = function () {
        return this.http.get('api/account/getcompanysettings');
    };
    CoreService.prototype.LoginAsAdmin = function () {
        return this.http.get("api/account/loginasadmin");
    };
    CoreService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CoreService);
    return CoreService;
}());
exports.CoreService = CoreService;


/***/ }),

/***/ "../../../../../src/app/core/sub-header/sub-header.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"headerData\" class=\"right-block\">\r\n    <span>{{headerData.Title}}</span>\r\n    <button *ngFor=\"let button of headerData.buttons\" [disabled]=\"button.disabled\" class=\"btn btn-success text-uppercase\" type=\"button\" (click)=\"performAction(button.actionType)\"><i *ngIf=\"button.isIcon\" class=\"material-icons\">{{button.iconText}}</i> {{button.type}}</button>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/core/sub-header/sub-header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var NewHeaderComponent = /** @class */ (function () {
    function NewHeaderComponent(_headerService) {
        this._headerService = _headerService;
    }
    NewHeaderComponent.prototype.performAction = function (type) {
        this._headerService.emitHeaderChanges(type);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewHeaderComponent.prototype, "headerData", void 0);
    NewHeaderComponent = __decorate([
        core_1.Component({
            selector: 'subheader',
            template: __webpack_require__("../../../../../src/app/core/sub-header/sub-header.component.html")
        }),
        __metadata("design:paramtypes", [header_sevice_1.HeaderService])
    ], NewHeaderComponent);
    return NewHeaderComponent;
}());
exports.NewHeaderComponent = NewHeaderComponent;


/***/ }),

/***/ "../../../../../src/app/core/vsts-token/tfs-token.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var core_service_1 = __webpack_require__("../../../../../src/app/core/services/core.service.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var TFSTokenComponent = /** @class */ (function () {
    function TFSTokenComponent(activatedRoute, coreService, router, commonServices) {
        this.activatedRoute = activatedRoute;
        this.coreService = coreService;
        this.router = router;
        this.commonServices = commonServices;
        this.tokenObject = {};
    }
    TFSTokenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.tokenObject = {
                Code: params['code'],
                State: params['state']
            };
            _this.coreService.generateToken(_this.tokenObject).subscribe(function (res) {
                if (res) {
                    var UserObject = Object.assign({ Username: res.Data.User.Username, UserId: res.Data.User.UserId, FirstName: res.Data.User.FirstName, LastName: res.Data.User.LastName, ProfileImageUrl: res.Data.User.ProfileImageUrl, ProjectList: res.Data.User.ProjectList, isTokenGenerate: true });
                    var userObject = Object.assign({ token: JSON.parse(res.Data.Access_Token)['auth_token'], role: res.Data.User.UserRole }, UserObject);
                    common_1.DataModel.UserRole = res.Data.User.UserRole;
                    localStorage.setItem('authorization', JSON.stringify(userObject));
                    _this.commonServices.load();
                    _this.router.navigateByUrl('admin/dashboard');
                }
            }, function (error) {
                debugger;
                localStorage.removeItem('authorization');
                _this.router.navigateByUrl('/login');
            });
        });
    };
    TFSTokenComponent = __decorate([
        core_1.Component({
            selector: 'app-tfs-token',
            template: "Redirecting to Neela ..."
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, core_service_1.CoreService, router_1.Router, common_1.CommonServices])
    ], TFSTokenComponent);
    return TFSTokenComponent;
}());
exports.TFSTokenComponent = TFSTokenComponent;


/***/ })

});
//# sourceMappingURL=core.module.chunk.js.map