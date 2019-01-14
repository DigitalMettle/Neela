webpackJsonp(["admin.module"],{

/***/ "../../../../../src/app/Admin/about-neela/about-neela.component.html":
/***/ (function(module, exports) {

module.exports = "Copyright (C) 2018 Digital Mettle, LLC, All Rights reserved"

/***/ }),

/***/ "../../../../../src/app/Admin/about-neela/about-neela.component.ts":
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
var AboutNeelaComponent = /** @class */ (function () {
    function AboutNeelaComponent() {
    }
    AboutNeelaComponent = __decorate([
        core_1.Component({
            selector: "about-neela",
            template: __webpack_require__("../../../../../src/app/Admin/about-neela/about-neela.component.html")
        })
    ], AboutNeelaComponent);
    return AboutNeelaComponent;
}());
exports.AboutNeelaComponent = AboutNeelaComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/admin-list/admin-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-list-conainer scroll-x\">\r\n    <h4 class=\"mb-3 t-header row-custom\">\r\n        <span class=\"col\">\r\n            {{'AdminModule.Label.User' | translate}}<span class=\"badge badge-secondary ml-1\">{{totalAdminUsers}}</span>\r\n        </span>\r\n        <span class=\"col\">\r\n            Email\r\n        </span>\r\n    </h4>\r\n    <ul class=\"list-group list-group-flush\">\r\n        <li class=\"list-group-item d-flex flex-row px-0 has-edit-button\" *ngFor=\"let user of adminUserList \">\r\n            <div class=\"row-custom\">\r\n                <div class=\"col\">\r\n                    <!--<div class=\"user-pic\" [ngStyle]=\"{'background-image': 'url(' + user.ProfilePhoto + ')'}\"></div>-->\r\n\r\n                    <div class=\"text\">\r\n                        <strong>{{user.FirstName}}</strong>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col col-50\">\r\n                    <strong>{{user.Email}}</strong>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"buttons-group-holder\">\r\n            </div>\r\n        </li>\r\n\r\n    </ul>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/Admin/admin-list/admin-list.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var AdminListComponent = /** @class */ (function () {
    function AdminListComponent(adminService) {
        this.adminService = adminService;
    }
    AdminListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getAdminUserList().subscribe(function (res) {
            if (res) {
                _this.adminUserList = res.Data;
                _this.totalAdminUsers = _this.adminUserList.length;
            }
        });
    };
    AdminListComponent = __decorate([
        core_1.Component({
            selector: 'admin-list',
            template: __webpack_require__("../../../../../src/app/Admin/admin-list/admin-list.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService])
    ], AdminListComponent);
    return AdminListComponent;
}());
exports.AdminListComponent = AdminListComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/admin.module.ts":
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
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var admin_routes_1 = __webpack_require__("../../../../../src/app/Admin/admin.routes.ts");
var common_2 = __webpack_require__("../../../../../src/app/common/index.ts");
var kendo_angular_upload_1 = __webpack_require__("../../../../@progress/kendo-angular-upload/dist/es/index.js");
var ng2_charts_1 = __webpack_require__("../../../../ng2-charts/index.js");
var kendo_angular_grid_1 = __webpack_require__("../../../../@progress/kendo-angular-grid/dist/es/index.js");
var ng2_ckeditor_1 = __webpack_require__("../../../../ng2-ckeditor/lib/ng2-ckeditor.js");
var index_1 = __webpack_require__("../../../../../src/app/Admin/index.ts");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [admin_routes_1.AdminRouteModule, ng2_ckeditor_1.CKEditorModule, common_2.CommonCustomModule, common_1.CommonModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, kendo_angular_upload_1.UploadModule, ng2_charts_1.ChartsModule, kendo_angular_grid_1.GridModule],
            declarations: [index_1.DashboardComponent, index_1.AdminListComponent, index_1.ProjectSettingsComponent, index_1.InviteUserComponent, index_1.UserListComponent, index_1.UserDetailsComponent, index_1.CompanySettingsComponent, index_1.WorkItemListComponent, index_1.WorkItemChildListComponent, index_1.WorkItemComponent, index_1.AboutNeelaComponent],
            exports: [],
            providers: [index_1.AdminService]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;


/***/ }),

/***/ "../../../../../src/app/Admin/admin.routes.ts":
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
var dashboard_component_1 = __webpack_require__("../../../../../src/app/Admin/dashboard/dashboard.component.ts");
var index_1 = __webpack_require__("../../../../../src/app/Admin/index.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var routes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'projectsettings', component: index_1.ProjectSettingsComponent },
    { path: 'inviteuser', component: index_1.InviteUserComponent },
    { path: 'userlist', component: index_1.UserListComponent },
    { path: 'userdetails', component: index_1.UserDetailsComponent },
    { path: 'userprofile', component: common_1.UserProfileComponent },
    { path: 'companysettings', component: index_1.CompanySettingsComponent },
    { path: 'userworkitemlist', component: index_1.WorkItemListComponent },
    { path: 'project/:projectId/workitem/add', component: index_1.WorkItemComponent, data: { isNew: true } },
    { path: 'project/:projectId/workitem/:workitemId/edit', component: index_1.WorkItemComponent, data: { isNew: false } },
    { path: 'about', component: index_1.AboutNeelaComponent },
];
var AdminRouteModule = /** @class */ (function () {
    function AdminRouteModule() {
    }
    AdminRouteModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRouteModule);
    return AdminRouteModule;
}());
exports.AdminRouteModule = AdminRouteModule;


/***/ }),

/***/ "../../../../../src/app/Admin/company-settings/company-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<h1 class=\"h4\">Company Settings</h1>-->\r\n<form [formGroup]=\"formData\">\r\n    <div class=\"card has-shadow company-settings\">\r\n        <div class=\"card-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterAppName' | translate}}\" formControlName=\"AppName\" [ngClass]=\"{'is-invalid' : formData.controls['AppName'].touched && formData.controls['AppName'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.AppName' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['AppName'].touched && formData.controls['AppName'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.AppName' | translate}}</small>\r\n                        </div>\r\n                    </div>\r\n                    <!--<div class=\"form-group\">\r\n        <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.CompanyLogo' | translate}}</div>\r\n    </div>-->\r\n                    <div class=\"form-group\">\r\n                        <div class=\"image-upload-container\">\r\n                            <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.CompanyLogo' | translate}}</div>\r\n                                <div class=\"form-group upload-img-box\">\r\n                                    <div class=\"picture-block border\">\r\n                                        <img src=\"{{formData.get('CompanyLogo').value}}\" /> <!--alt=\"../../../assets/img/logo_dm.png\" />-->\r\n                                    </div>\r\n                                    <div class=\"action-block mt-4\">\r\n                                        <div class=\"upload-btn-holder\">\r\n                                            <div class=\"btn btn-primary\">\r\n                                                <kendo-upload accept=\".png,.jpg\" class=\"kendo-upload-file updatename\" [saveUrl]=\"profileImageUploadUrl\" (success)=\"uploadLogoSuccessEventHandler($event)\">\r\n                                                </kendo-upload>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"image-upload-container\">\r\n                            <div class=\"form-control form-control-secondary\">\r\n                                {{'AdminModule.Label.HeaderLogo' | translate}}</div>\r\n                                <div class=\"form-group upload-img-box\">\r\n                                    <div class=\"picture-block border\">\r\n                                        <img src=\"{{formData.get('HeaderLogo').value}}\" /> <!--alt=\"../../../assets/img/logo_dm.png\" />-->\r\n                                    </div>\r\n                                    <div class=\"action-block mt-4\">\r\n                                        <div class=\"upload-btn-holder\">\r\n                                            <div class=\"btn btn-primary\">\r\n                                                <kendo-upload accept=\".png,.jpg\" class=\"kendo-upload-file updatename\" [saveUrl]=\"headerLogoUploadUrl\" (success)=\"uploadHeaderLogoSuccessEventHandler($event)\">\r\n                                                </kendo-upload>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                    <!--<div class=\"form-group has-input-icon\">\r\n                        <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.ADLoginSetup' | translate}}</div>\r\n                        <i class=\"material-icons rotate\" (mouseenter)=\"toggleElement(adLoginSetupToolTip)\" (mouseleave)=\"toggleElement(adLoginSetupToolTip)\">error</i>\r\n                        <div class=\"custom-tooltip\" #adLoginSetupToolTip hidden>\r\n                            AD Login Setup\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterAppId' | translate}}\" formControlName=\"AppId\" [ngClass]=\"{'is-invalid' : formData.controls['AppId'].touched && formData.controls['AppId'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.AppId' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['AppId'].touched && formData.controls['AppId'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.AppId' | translate}}</small>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterAppSecretKey' | translate}}\" formControlName=\"AppSecretKey\" [ngClass]=\"{'is-invalid' : formData.controls['AppSecretKey'].touched && formData.controls['AppSecretKey'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.AppSecretKey' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['AppSecretKey'].touched && formData.controls['AppSecretKey'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.AppSecretKey' | translate}}</small>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterPersonalAccessToken' | translate}}\" formControlName=\"PersonalAccessToken\" [ngClass]=\"{'is-invalid' : formData.controls['PersonalAccessToken'].touched && formData.controls['PersonalAccessToken'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.PersonalAccessToken' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['PersonalAccessToken'].touched && formData.controls['PersonalAccessToken'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.PersonalAccessToken' | translate}}</small>\r\n                        </div>\r\n                    </div>-->\r\n                    <div class=\"form-group has-input-icon\">\r\n                        <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.VSTSSettings' | translate}}</div>\r\n                        <i class=\"material-icons rotate\" (mouseenter)=\"toggleElement(vstsSettingsToolTip)\" (mouseleave)=\"toggleElement(vstsSettingsToolTip)\">error</i>\r\n                        <div class=\"custom-tooltip\" #vstsSettingsToolTip hidden>\r\n                            VSTS Settings\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterSettingOne' | translate}}\" formControlName=\"SettingOne\" [ngClass]=\"{'is-invalid' : formData.controls['SettingOne'].touched && formData.controls['SettingOne'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.SettingOne' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SettingOne'].touched && formData.controls['SettingOne'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.SettingOne' | translate}}</small>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterSettingTwo' | translate}}\" formControlName=\"SettingTwo\" [ngClass]=\"{'is-invalid' : formData.controls['SettingTwo'].touched && formData.controls['SettingTwo'].invalid}\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.SettingTwo' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SettingTwo'].touched && formData.controls['SettingTwo'].hasError('required')\">\r\n                            <small>{{'AdminModule.Validations.SettingTwo' | translate}}</small>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                   \r\n                    <div class=\"form-group\">\r\n                        <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.BackgroundForLoginScreen' | translate}}</div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"image-upload-container\">\r\n                            \r\n                            <div class=\"form-group upload-img-box\">\r\n                                <div class=\"picture-block height-lg border\">\r\n                                    <img src=\"{{formData.get('BackgroundImageUrlForLogin').value}}\" />\r\n                                </div>\r\n                                <div class=\"action-block mt-4\">\r\n                                    <div class=\"upload-btn-holder\">\r\n                                        <div class=\"btn btn-primary\">\r\n                                            <kendo-upload accept=\".png,.jpg\" class=\"kendo-upload-file updatename\" [saveUrl]=\"backgroundImageForLoginUploadUrl\" (success)=\"loginImageSuccessEventHandler($event)\">\r\n                                            </kendo-upload>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n            </div>\r\n\r\n            <div class=\"email-settings\">\r\n                <div class=\"form-control form-control-secondary\">\r\n                    {{'AdminModule.Label.HTMLEmailSettings' | translate}}</div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group has-input-icon\">\r\n                                <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.SMTPSettings' | translate}}</div>\r\n                                <i class=\"material-icons rotate\" (mouseenter)=\"toggleElement(smtpSettingsToolTip)\" (mouseleave)=\"toggleElement(smtpSettingsToolTip)\">error</i>\r\n                                <div class=\"custom-tooltip\" #smtpSettingsToolTip hidden>\r\n                                    SMTP Settings\r\n                                </div>\r\n                                <!--<small class=\"text-muted\">{{'AdminModule.Label.AppName' | translate}}</small>-->\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterFromEmailAddress' | translate}}\" type=\"text\" formControlName=\"SMTPFromEmail\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPFromEmail'].touched && formData.controls['SMTPFromEmail'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.FromEmailForFormField' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPFromEmail'].touched && formData.controls['SMTPFromEmail'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPFromEmail' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterFromName' | translate}}\" type=\"text\" formControlName=\"SMTPFromName\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPFromName'].touched && formData.controls['SMTPFromName'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.FromNameForFormField' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPFromName'].touched && formData.controls['SMTPFromName'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPFromName' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterSMTPHost' | translate}}\" type=\"text\" formControlName=\"SMTPHostUrl\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPHostUrl'].touched && formData.controls['SMTPHostUrl'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.SMTPHostMailServer' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPHostUrl'].touched && formData.controls['SMTPHostUrl'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPHostUrl' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <h6>{{'AdminModule.Label.TypeOfEncryption' | translate}} </h6>\r\n                            <div class=\"form-group form-radio-inline\">\r\n                                <div class=\"form-check radio-checkbox-custom\">\r\n                                    <label>\r\n                                        {{'AdminModule.Label.None' | translate}}\r\n                                        <input class=\"form-check-input\" type=\"radio\" value=\"None\" formControlName=\"EncryptionType\">\r\n                                        <span class=\"circle-check-mark\"></span>\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"form-check radio-checkbox-custom\">\r\n                                    <label>\r\n                                        {{'AdminModule.Label.SSL' | translate}}\r\n                                        <input class=\"form-check-input\" type=\"radio\" value=\"SSL\" formControlName=\"EncryptionType\">\r\n                                        <span class=\"circle-check-mark\"></span>\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"form-check radio-checkbox-custom\">\r\n                                    <label>\r\n                                        {{'AdminModule.Label.TLS' | translate}}\r\n                                        <input class=\"form-check-input\" type=\"radio\" value=\"TLS\" formControlName=\"EncryptionType\">\r\n                                        <span class=\"circle-check-mark\"></span>\r\n                                    </label>\r\n                                </div>\r\n                                <small class=\"text-muted d-block\">{{'AdminModule.Label.SSLRecommendedOption' | translate}}</small>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.EnterSMTPPort' | translate}}\" type=\"text\" formControlName=\"SMTPPort\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPPort'].touched && formData.controls['SMTPPort'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.SMTPPortToMailServer' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPPort'].touched && formData.controls['SMTPPort'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPPort' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <h6>{{'AdminModule.Label.SMTPAuthentication' | translate}}</h6>\r\n                            <div class=\"form-group form-radio-inline\">\r\n                                <div class=\"form-check radio-checkbox-custom\">\r\n                                    <label>\r\n                                        {{'AdminModule.Label.Yes' | translate}}\r\n                                        <input class=\"form-check-input\" type=\"radio\" value=\"Yes\" formControlName=\"SMTPAuthentication\">\r\n                                        <span class=\"circle-check-mark\"></span>\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"form-check radio-checkbox-custom\">\r\n                                    <label>\r\n                                        {{'AdminModule.Label.No' | translate}}\r\n                                        <input class=\"form-check-input\" type=\"radio\" value=\"No\" formControlName=\"SMTPAuthentication\">\r\n                                        <span class=\"circle-check-mark\"></span>\r\n                                    </label>\r\n                                </div>\r\n\r\n                                <small class=\"text-muted d-block\">{{'AdminModule.Label.SMTPAuthentication' | translate}}</small>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.SMTPUsername' | translate}}\" type=\"text\" formControlName=\"SMTPUserName\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPUserName'].touched && formData.controls['SMTPUserName'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.MailServerLoginUsername' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPUserName'].touched && formData.controls['SMTPUserName'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPUsername' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"{{'AdminModule.Placeholder.SMTPPassword' | translate}}\" type=\"text\" formControlName=\"SMTPPassword\" [ngClass]=\"{'is-invalid' : formData.controls['SMTPPassword'].touched && formData.controls['SMTPPassword'].invalid}\">\r\n                                <small class=\"text-muted d-block\">{{'AdminModule.Label.MailServerLoginPassword' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['SMTPPassword'].touched && formData.controls['SMTPPassword'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.SMTPPassword' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <!--<div class=\"btn-holder\">\r\n                <button type=\"button\" class=\"btn btn-primary\">{{'AdminModule.Label.SaveSmtpSettings' | translate}}</button>\r\n            </div>-->\r\n                        </div>\r\n                        <div class=\"col-lg-8 col-lg\">\r\n                            <div class=\"form-group has-input-icon\">\r\n                                <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.InvitationEmailTemplate' | translate}}</div>\r\n                                <i class=\"material-icons rotate\" (mouseenter)=\"toggleElement(invitationEmailTemplateToolTip)\" (mouseleave)=\"toggleElement(invitationEmailTemplateToolTip)\">error</i>\r\n                                <div class=\"custom-tooltip\" #invitationEmailTemplateToolTip hidden>\r\n                                    Invitation Email Template\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"Enter Email Subject\" type=\"text\" formControlName=\"InvitationEmailSubject\" [ngClass]=\"{'is-invalid' : formData.controls['InvitationEmailSubject'].touched && formData.controls['InvitationEmailSubject'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.EmailSubjectLine' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['InvitationEmailSubject'].touched && formData.controls['InvitationEmailSubject'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.InvitationEmailSubject' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"f-w-b\">{{'AdminModule.Label.EmailMessage' | translate}}</label>\r\n                                <div class=\"textarea-holder\">\r\n                                    <!--<textarea class=\"form-control\" placeholder=\"WYSIWYG EDITOR\" rows=\"8\" formControlName=\"InvitationEmailMessage\"></textarea>-->\r\n                                    <ckeditor [config]=\"editorConfig.DiscriptionConfig\" formControlName=\"InvitationEmailMessage\"></ckeditor>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group has-input-icon\">\r\n                                <div class=\"form-control form-control-secondary\">{{'AdminModule.Label.PasswordResetEmailTemplate' | translate}}</div>\r\n                                <i class=\"material-icons rotate\" (mouseenter)=\"toggleElement(passwordResetEmailTemplateToolTip)\" (mouseleave)=\"toggleElement(passwordResetEmailTemplateToolTip)\">error</i>\r\n                                <div class=\"custom-tooltip\" #passwordResetEmailTemplateToolTip hidden>\r\n                                    Password Reset Email Template\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"Enter Email Subject\" type=\"text\" formControlName=\"PasswordResetEmailSubject\" [ngClass]=\"{'is-invalid' : formData.controls['PasswordResetEmailSubject'].touched && formData.controls['PasswordResetEmailSubject'].invalid}\">\r\n                                <small class=\"text-muted\">{{'AdminModule.Label.EmailSubjectLine' | translate}}</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['PasswordResetEmailSubject'].touched && formData.controls['PasswordResetEmailSubject'].hasError('required')\">\r\n                                    <small>{{'AdminModule.Validations.PasswordResetEmailSubject' | translate}}</small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"f-w-b\">{{'AdminModule.Label.EmailMessage' | translate}}</label>\r\n                                <div class=\"textarea-holder\">\r\n                                    <!--<textarea class=\"form-control\" placeholder=\"WYSIWYG EDITOR\" rows=\"8\" formControlName=\"PasswordResetEmailMessage\"></textarea>-->\r\n                                    <ckeditor [config]=\"editorConfig.DiscriptionConfig\" formControlName=\"PasswordResetEmailMessage\"></ckeditor>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            <!--<div class=\"form-group\">\r\n                <label>{{'AdminModule.Label.CompanyMessage' | translate}}</label>\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"CompanyMessage\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>Company Logo</label>\r\n                <div class=\"upload-img-box d-flex flex-row justify-content-between rounded\">\r\n\r\n                    <div class=\"picture-block border rounded\">\r\n                        <img class=\"img-fluid\" src=\"{{companyLogo}}\" alt=\"Profile Picture\" />\r\n                    </div>\r\n\r\n                    <div class=\"action-block text-right\">\r\n                        <label>Upload/Change Image</label>\r\n                        <div class=\"upload-btn-holder\">\r\n                            <div class=\"btn btn-dark\">\r\n                                <kendo-upload accept=\".png,.jpg\" class=\"kendo-upload-file\" [saveUrl]=\"uploadSaveUrl\" (success)=\"successEventHandler($event)\">\r\n                                </kendo-upload>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <button type=\"button\" class=\"btn btn-primary mt-2\" (click)=\"saveCompanySettings()\">Update</button>-->\r\n        </div>\r\n    </div>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/Admin/company-settings/company-settings.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
//import { FormControl } from '@angular/forms/src/model';
//import { Validators } from '@angular/forms/src/validators';
var CompanySettingsComponent = /** @class */ (function () {
    function CompanySettingsComponent(_adminService, fb, _headerService, _commonService) {
        this._adminService = _adminService;
        this.fb = fb;
        this._headerService = _headerService;
        this._commonService = _commonService;
        this.profileImageUploadUrl = "api/account/uploadimage?type=profileimage";
        this.backgroundImageForLoginUploadUrl = "api/account/uploadimage?type=backgroundimage";
        this.headerLogoUploadUrl = "api/account/uploadimage?type=headerlogo";
        this.editorConfig = common_1.CkEditorConfig;
        this.formData = this.fb.group({
            AppName: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            CompanyLogo: [null],
            BackgroundImageUrlForLogin: [null],
            PersonalAccessToken: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SettingOne: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SettingTwo: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPFromEmail: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPFromName: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPHostUrl: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPPort: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            EncryptionType: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPAuthentication: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPUserName: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            SMTPPassword: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            InvitationEmailSubject: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            InvitationEmailMessage: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            PasswordResetEmailSubject: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            PasswordResetEmailMessage: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            HeaderLogo: [null]
        });
    }
    CompanySettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var content = document.getElementsByClassName('updatename');
        for (var i = 0; i < content.length; i++) {
            content[i].querySelector('.updatename div span').innerHTML = "UPLOAD OR REPLACE IMAGE";
        }
        this.getCompanySettings();
        //set the header data of the page.
        this.setHeaderData();
        //when form value update update the header data
        this.formData.valueChanges.subscribe(function (res) {
            _this.setHeaderData();
        });
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'update')
                _this.saveCompanySettings();
        });
    };
    CompanySettingsComponent.prototype.saveCompanySettings = function () {
        this._adminService.setCompanySettings(this.formData.value)
            .subscribe();
        //if (this.formData.controls["AppName"].touched && this.formData.controls["AppName"].dirty)
        this._commonService.setHeaderValues({
            HeaderLogo: this.formData.controls["HeaderLogo"].value,
            HeaderAppName: this.formData.controls["AppName"].value
        });
    };
    CompanySettingsComponent.prototype.getCompanySettings = function () {
        var _this = this;
        this._adminService.getCompanySettings()
            .subscribe(function (res) {
            if (res.Data) {
                _this.formData.patchValue({ AppName: res.Data.AppName });
                _this.formData.patchValue({ CompanyLogo: res.Data.CompanyLogo });
                _this.formData.patchValue({ BackgroundImageUrlForLogin: res.Data.BackgroundImageUrlForLogin });
                _this.formData.patchValue({ PersonalAccessToken: res.Data.PersonalAccessToken });
                _this.formData.patchValue({ SettingOne: res.Data.SettingOne });
                _this.formData.patchValue({ SettingTwo: res.Data.SettingTwo });
                _this.formData.patchValue({ SMTPFromEmail: res.Data.SMTPFromEmail });
                _this.formData.patchValue({ SMTPFromName: res.Data.SMTPFromName });
                _this.formData.patchValue({ SMTPHostUrl: res.Data.SMTPHostUrl });
                _this.formData.patchValue({ SMTPPort: res.Data.SMTPPort });
                _this.formData.patchValue({ EncryptionType: res.Data.EncryptionType });
                _this.formData.patchValue({ SMTPAuthentication: res.Data.SMTPAuthentication });
                _this.formData.patchValue({ SMTPUserName: res.Data.SMTPUserName });
                _this.formData.patchValue({ SMTPPassword: res.Data.SMTPPassword });
                _this.formData.patchValue({ InvitationEmailSubject: res.Data.InvitationEmailSubject });
                _this.formData.patchValue({ InvitationEmailMessage: res.Data.InvitationEmailMessage });
                _this.formData.patchValue({ PasswordResetEmailSubject: res.Data.PasswordResetEmailSubject });
                _this.formData.patchValue({ PasswordResetEmailMessage: res.Data.PasswordResetEmailMessage });
                _this.formData.patchValue({ HeaderLogo: res.Data.HeaderLogo });
            }
        });
    };
    CompanySettingsComponent.prototype.uploadLogoSuccessEventHandler = function (e) {
        if (e.operation == "upload") {
            this.formData.patchValue({ CompanyLogo: e.response.body.Data });
        }
    };
    CompanySettingsComponent.prototype.loginImageSuccessEventHandler = function (e) {
        if (e.operation == "upload") {
            this.formData.patchValue({ BackgroundImageUrlForLogin: e.response.body.Data });
        }
    };
    CompanySettingsComponent.prototype.uploadHeaderLogoSuccessEventHandler = function (e) {
        debugger;
        if (e.operation == "upload") {
            this.formData.patchValue({ HeaderLogo: e.response.body.Data });
        }
    };
    CompanySettingsComponent.prototype.setHeaderData = function () {
        //create Header Data.
        this.headerData = { Title: "Company Settings" };
        this.headerData['buttons'] = [{ actionType: 'update', type: "Update Settings", disabled: this.formData.invalid, isIcon: false }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    CompanySettingsComponent.prototype.ngOnDestroy = function () {
        this._headerService.emitChildChanges('');
        this.subscription.unsubscribe();
    };
    CompanySettingsComponent.prototype.toggleElement = function (element) {
        if (element) {
            element.hidden = !element.hidden;
        }
    };
    CompanySettingsComponent = __decorate([
        core_1.Component({
            selector: "company-settings",
            template: __webpack_require__("../../../../../src/app/Admin/company-settings/company-settings.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, forms_1.FormBuilder, header_sevice_1.HeaderService, common_1.CommonServices])
    ], CompanySettingsComponent);
    return CompanySettingsComponent;
}());
exports.CompanySettingsComponent = CompanySettingsComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dashborad\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 mb-4\">\r\n            <div class=\"projects-list-container\">\r\n                <div class=\"form-group\">\r\n                    <select class=\"custom-select custom-select-secondary\" id=\"inlineFormCustomSelect\" (change)=\"onSelected($event.target.value)\" >\r\n                        <!--<option value=\"-1\">{{'AdminModule.SelectYourProject' | translate}}</option>-->\r\n                        <option *ngFor=\"let project of projectList\" value={{project.Id}} >{{project.Name}}</option>\r\n                    </select>\r\n                    <small class=\"text-muted\">{{'AdminModule.Label.ProjectsList' | translate}}</small>\r\n                    <small class=\"text-muted\" *ngIf=\"projectList?.length==0\">{{'AdminModule.Label.NoProjects' | translate}}</small>\r\n                </div>\r\n            </div>\r\n            <p>{{projectSummary}}</p>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TODAY'S STATUS</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12 chart\" *ngIf=\"barChartData?.length\">\r\n                            <canvas baseChart #baseChart1=\"base-chart\"\r\n                                    [datasets]=\"barChartData\"\r\n                                    [labels]=\"barChartLabels\"\r\n                                    [options]=\"barChartOptions\"\r\n                                    [legend]=\"barChartLegend\"\r\n                                    [chartType]=\"barChartType\"\r\n                                    (chartHover)=\"chartHovered($event)\"\r\n                                    [colors]=\"barChartColors\"\r\n                                    (chartClick)=\"chartClicked($event)\" ></canvas>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TOTAL OPEN: STATUS</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\" *ngIf=\"lineChartData1?.length\">\r\n                        <canvas baseChart #baseChart2=\"base-chart\"\r\n                                [datasets]=\"lineChartData1\"\r\n                                [labels]=\"lineChartLabels\"\r\n                                [options]=\"lineChartOptions\"\r\n                                [colors]=\"lineChartColors\"\r\n                                [legend]=\"lineChartLegend\"\r\n                                [chartType]=\"lineChartType\"\r\n                                (chartHover)=\"chartHovered($event)\"\r\n                                (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TOTAL OPEN: TYPE</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\" *ngIf=\"lineChartData2?.length\">\r\n                        <canvas baseChart #baseChart3=\"base-chart\"\r\n                                [datasets]=\"lineChartData2\"\r\n                                [labels]=\"lineChartLabels\"\r\n                                [options]=\"lineChartOptions\"\r\n                                [colors]=\"lineChartColors\"\r\n                                [legend]=\"lineChartLegend\"\r\n                                [chartType]=\"lineChartType\"\r\n                                (chartHover)=\"chartHovered($event)\"\r\n                                (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/Admin/dashboard/dashboard.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
__webpack_require__("../../../../rxjs/Rx.js");
var ng2_charts_1 = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(adminService, _headerService) {
        this.adminService = adminService;
        this._headerService = _headerService;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.barChartLabels = [''];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.lineChartLabels = ['3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'Today'];
        this.lineChartOptions = { responsive: true };
        this.barChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true,
            plugins: {
                datalabels: {
                    display: true,
                    align: 'center',
                    anchor: 'center'
                }
            },
            scales: {
                xAxes: [{
                        stacked: true,
                        stackLabels: {
                            enabled: true
                        }
                    }],
                yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        this.barChartColors = [
            {
                backgroundColor: '#02B8D3',
            },
            {
                backgroundColor: '#028497',
            },
            {
                backgroundColor: '#04536E',
            },
            {
                backgroundColor: '#15a1b6',
            },
            {
                backgroundColor: '#00CED1',
            },
            {
                backgroundColor: '#20B2AA'
            },
            {
                backgroundColor: '#5F9EA0'
            },
            {
                backgroundColor: '#008B8B'
            }
        ];
        this.lineChartColors = [
            {
                backgroundColor: 'transparent',
                borderColor: '#02B8D3',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#02B8D3',
            },
            {
                backgroundColor: 'transparent',
                borderColor: '#028497',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#028497',
            },
            {
                backgroundColor: 'transparent',
                borderColor: '#04536E',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#04536E',
            },
            {
                backgroundColor: 'transparent',
                borderColor: '#15a1b6',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#15a1b6',
            }, {
                backgroundColor: 'transparent',
                borderColor: '#00CED1',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#00CED1',
            }, {
                backgroundColor: 'transparent',
                borderColor: '#20B2AA',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#20B2AA',
            }, {
                backgroundColor: 'transparent',
                borderColor: '#5F9EA0',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#5F9EA0',
            }, {
                backgroundColor: 'transparent',
                borderColor: '#008B8B',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#008B8B',
            }
        ];
        //initialize charts by raw data.
        this.barChartData = [
            { data: [0, 0, 0], label: '' },
        ];
        this.lineChartData1 = [
            { data: [0, 0, 0, 0], label: '' },
        ];
        this.lineChartData2 = [
            { data: [0, 0, 0, 0], label: '' },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set header Data
        this.setHeaderData();
        //add subscription when sub-header button click.
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'syncproject')
                _this.syncProject();
        });
        //perform action when the header fire and event.
        this.adminService.getProjectList().subscribe(function (res) {
            if (res && res.Data.length > 0)
                _this.projectList = res.Data;
            _this.setChartData(_this.projectList[0].Id);
        });
    };
    DashboardComponent.prototype.onSelected = function (projectId) {
        this.setChartData(projectId);
    };
    DashboardComponent.prototype.syncProject = function () {
        this.adminService.SyncProject().subscribe(function (res) { });
    };
    DashboardComponent.prototype.setChartData = function (projectId) {
        var _this = this;
        this.adminService.getChartData(projectId).subscribe(function (res) {
            if (res.Data) {
                _this.chart1.chart.destroy();
                _this.chart1.chart = 0;
                _this.chart1.datasets = res.Data.BarChartModel;
                _this.chart1.labels = res.Data.BarChartLabels;
                _this.chart1.ngOnInit();
                _this.chart2.chart.destroy();
                _this.chart2.chart = 0;
                _this.chart2.datasets = res.Data.FistLineChartModel;
                _this.chart2.labels = _this.lineChartLabels;
                _this.chart2.ngOnInit();
                _this.chart3.chart.destroy();
                _this.chart3.chart = 0;
                _this.chart3.datasets = res.Data.SecondLineChartModel;
                _this.chart3.labels = _this.lineChartLabels;
                _this.chart3.ngOnInit();
                _this.projectSummary = res.Data.Description;
            }
        });
    };
    // events
    DashboardComponent.prototype.chartClicked = function (e) {
    };
    DashboardComponent.prototype.chartHovered = function (e) {
    };
    DashboardComponent.prototype.setHeaderData = function () {
        //create Header Data.
        this.headerData = { Title: "DASHBOARD" };
        this.headerData['buttons'] = [{ actionType: 'syncproject', type: "SYNC DASHBOARD", disabled: false, isIcon: true, iconText: 'sync' }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    __decorate([
        core_1.ViewChild("baseChart1"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], DashboardComponent.prototype, "chart1", void 0);
    __decorate([
        core_1.ViewChild("baseChart2"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], DashboardComponent.prototype, "chart2", void 0);
    __decorate([
        core_1.ViewChild("baseChart3"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], DashboardComponent.prototype, "chart3", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            template: __webpack_require__("../../../../../src/app/Admin/dashboard/dashboard.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, header_sevice_1.HeaderService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_component_1 = __webpack_require__("../../../../../src/app/Admin/dashboard/dashboard.component.ts");
exports.DashboardComponent = dashboard_component_1.DashboardComponent;
var project_settings_component_1 = __webpack_require__("../../../../../src/app/Admin/project-settings/project-settings.component.ts");
exports.ProjectSettingsComponent = project_settings_component_1.ProjectSettingsComponent;
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
exports.AdminService = admin_service_1.AdminService;
var invite_user_component_1 = __webpack_require__("../../../../../src/app/Admin/invite-user/invite-user.component.ts");
exports.InviteUserComponent = invite_user_component_1.InviteUserComponent;
var user_list_component_1 = __webpack_require__("../../../../../src/app/Admin/user-list/user-list.component.ts");
exports.UserListComponent = user_list_component_1.UserListComponent;
var user_details_component_1 = __webpack_require__("../../../../../src/app/Admin/user-details/user-details.component.ts");
exports.UserDetailsComponent = user_details_component_1.UserDetailsComponent;
var company_settings_component_1 = __webpack_require__("../../../../../src/app/Admin/company-settings/company-settings.component.ts");
exports.CompanySettingsComponent = company_settings_component_1.CompanySettingsComponent;
var workitem_list_component_1 = __webpack_require__("../../../../../src/app/Admin/workitemlist/workitem-list.component.ts");
exports.WorkItemListComponent = workitem_list_component_1.WorkItemListComponent;
var workitem_listchild_component_1 = __webpack_require__("../../../../../src/app/Admin/workitemlist/workitem-listchild.component.ts");
exports.WorkItemChildListComponent = workitem_listchild_component_1.WorkItemChildListComponent;
var addwork_item_component_1 = __webpack_require__("../../../../../src/app/Admin/work-item/addwork-item.component.ts");
exports.WorkItemComponent = addwork_item_component_1.WorkItemComponent;
var admin_list_component_1 = __webpack_require__("../../../../../src/app/Admin/admin-list/admin-list.component.ts");
exports.AdminListComponent = admin_list_component_1.AdminListComponent;
var about_neela_component_1 = __webpack_require__("../../../../../src/app/Admin/about-neela/about-neela.component.ts");
exports.AboutNeelaComponent = about_neela_component_1.AboutNeelaComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/invite-user/invite-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card has-shadow invite-user\">\r\n    <div class=\"card-header\">\r\n        <!-- Nav tabs -->\r\n        <ul class=\"nav tab-nav\">\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#clientUsers\">CLIENT USERS </a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" data-toggle=\"tab\" href=\"#adminstrators\">ADMINISTRATORS</a>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n\r\n\r\n    <div class=\"card-body\">\r\n        <div class=\"tab-content tab-content-custom\">\r\n            <div class=\"tab-pane active\" id=\"clientUsers\">\r\n                <form [formGroup]=\"formData\">\r\n                    <div class=\"action mb-3 d-flex justify-content-between w-100\">\r\n                        <button type=\"button\" class=\"btn btn-primary\" routerLink=\"/admin/userlist\"> <i class=\"material-icons\">arrow_back_ios</i> Return To USERS</button>\r\n                        <button type=\"button\" [disabled]=\"formData.invalid\" class=\"btn btn-primary\" (click)=\"sendInvite()\"><i class=\"material-icons\">add</i> {{'CoreModule.Button.Invite' | translate}}</button>\r\n\r\n                    </div>\r\n                    <h5 class=\"card-sub-title\">{{'CoreModule.Label.InviteUser' | translate}}</h5>\r\n\r\n                    <div class=\"\">\r\n                        <div class=\"row align-items-start\">\r\n                            <div class=\"col-md-4\">\r\n                                <div class=\"form-group mb-3\">\r\n                                    <input class=\"form-control\" [ngClass]=\"{'is-invalid':formData.get('FirstName').touched && formData.get('FirstName').invalid }\" type=\"text\" placeholder=\"{{'CoreModule.Placeholder.FirstName' | translate}}\" name=\"First Name\" formControlName=\"FirstName\" />\r\n                                    <small class=\"text-muted\">First Name</small>\r\n                                    <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('FirstName').touched && formData.get('FirstName').hasError('required')\">First Name {{'CoreModule.Validations.Required' | translate}}</div>\r\n                                    <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('FirstName').touched && !formData.get('FirstName').hasError('required') && formData.get('FirstName').hasError('blankValidation')\">{{'CoreModule.Validations.BlankValidation' | translate}}</div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-4\">\r\n                                <div class=\"form-group mb-3\">\r\n                                    <input class=\"form-control\" [ngClass]=\"{'is-invalid':formData.get('LastName').touched && formData.get('LastName').invalid }\" type=\"text\" placeholder=\"{{'CoreModule.Placeholder.LastName' | translate}}\" name=\"LastName\" formControlName=\"LastName\" />\r\n                                    <!--<div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('LastName').touched && formData.get('LastName').hasError('required')\">Last Name {{'CoreModule.Validations.Required' | translate}}</div>-->\r\n                                    <small class=\"text-muted\">\r\n                                        Last Name\r\n                                    </small>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-4\">\r\n                                <div class=\"form-group mb-3\">\r\n                                    <input class=\"form-control\" [ngClass]=\"{'is-invalid':formData.get('Email').touched && formData.get('Email').invalid }\" type=\"text\" placeholder=\"{{'CoreModule.Placeholder.Email' | translate}}\" formControlName=\"Email\" />\r\n                                    <small class=\"text-muted\">Email</small>\r\n                                    <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('Email').touched && formData.get('Email').hasError('required')\">Email {{'CoreModule.Validations.Required' | translate}}</div>\r\n                                    <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('Email').touched && !formData.get('Email').hasError('required') && formData.get('Email').hasError('emailFormat')\">{{'CoreModule.Validations.EmailFormat' | translate}}</div>\r\n                                    <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('Email').hasError('isemailexist')\">{{'CoreModule.Validations.EmailExist' | translate}}</div>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n\r\n                    <div formArrayName=\"Projects\" class=\"row\">\r\n                        <div class=\"col-lg-4 col-md-6\" *ngFor=\"let project of ProjectList.controls; let i=index\" [formGroupName]=\"i\">\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    <input class=\"form-check-input\" type=\"checkbox\" formControlName=\"IsSelected\">{{formData.controls['Projects'].controls[i].value.Name | translate}}\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"form-text text-danger\" *ngIf=\"formData.get('Projects').hasError('multipleCheckboxRequireOne')\">* {{'CoreModule.Validations.Select' | translate}}</div>\r\n\r\n\r\n                </form>\r\n            </div>\r\n            <div class=\"tab-pane fade\" id=\"adminstrators\">\r\n\r\n              <admin-list></admin-list>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/Admin/invite-user/invite-user.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var InviteUserComponent = /** @class */ (function () {
    function InviteUserComponent(adminService, fb, customValidation, router) {
        this.adminService = adminService;
        this.fb = fb;
        this.customValidation = customValidation;
        this.router = router;
        this.isSendInviteDisable = true;
        this.isInviteSend = false;
        this.isUserExist = false;
        this.formData = this.fb.group({
            FirstName: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateEmail]), customValidation.checkUserEmail(this.adminService)],
            Projects: this.fb.array([], customValidation.multipleCheckboxRequireOne)
        });
    }
    Object.defineProperty(InviteUserComponent.prototype, "ProjectList", {
        get: function () { return this.formData.get('Projects'); },
        enumerable: true,
        configurable: true
    });
    InviteUserComponent.prototype.initProject = function () {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        });
    };
    InviteUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getProjectList().subscribe(function (res) {
            if (res) {
                _this.projectList = res.Data;
                var projectCount = res.Data.length;
                var projectControl = _this.formData.controls["Projects"];
                for (var i = 0; i < projectCount; i++) {
                    projectControl.push(_this.initProject());
                }
                _this.formData.patchValue({ Projects: res.Data });
            }
        });
    };
    InviteUserComponent.prototype.sendInvite = function () {
        var _this = this;
        if (this.formData.valid) {
            this.formData.value.FirstName = this.formData.value.FirstName.trim();
            this.formData.value.LastName = this.formData.value.LastName.trim();
            this.formData.value.Email = this.formData.value.Email.trim();
            this.adminService.sendInvite(this.formData.value).subscribe(function (res) {
                _this.isInviteSend = res;
                if (res) {
                    _this.router.navigate(['/admin/userlist']);
                }
            });
        }
    };
    InviteUserComponent = __decorate([
        core_1.Component({
            selector: 'invite-user',
            template: __webpack_require__("../../../../../src/app/Admin/invite-user/invite-user.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, forms_1.FormBuilder, common_1.Validations, router_1.Router])
    ], InviteUserComponent);
    return InviteUserComponent;
}());
exports.InviteUserComponent = InviteUserComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/project-settings/project-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"projects-list-container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <div class=\"form-group\">\r\n                <select class=\"custom-select custom-select-secondary\" id=\"inlineFormCustomSelect\" (change)=\"onSelect($event.target.value)\">\r\n                    <option value=\"-1\">{{'AdminModule.SelectProject' | translate}}</option>\r\n                    <option *ngFor=\"let project of projectList\" value={{project.Id}}>{{project.Name}}</option>\r\n                </select>\r\n                <small class=\"text-muted\">{{'AdminModule.Label.ProjectsList' | translate}}</small>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<form [formGroup]=\"adminSettingForm\" *ngIf=\"isDisplaySettings\" (submit)=\"saveProjectSetting()\">\r\n    <div class=\"card mb-4 has-shadow\">\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div formArrayName=\"WorkItemsList\" class=\"show-work-item mb-4\">\r\n                        <h5 class=\"card-title\">{{'AdminModule.Label.ItemsToShow' | translate}}</h5>\r\n                        <div *ngFor=\"let workItem of WorkItemList.controls; let i=index\" [formGroupName]=\"i\" class=\"form-check form-check-custom pl-0\">\r\n                            <label>\r\n\r\n                                <input formControlName=\"IsSelected\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                {{workItem.value.Name | translate}}\r\n                                <span class=\"squire-check-mark\"></span>\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"vsts-Fields mb-4\">\r\n                        <h5 class=\"card-title\">{{'AdminModule.Label.FieldUpdate' | translate}}</h5>\r\n                        <div formGroupName=\"EditableFields\">\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.Title' | translate}}\r\n                                    <input formControlName=\"Title\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.Details' | translate}}\r\n                                    <input formControlName=\"Details\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.CustomerFeedback' | translate}}\r\n                                    <input formControlName=\"CustomerFeedback\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    \r\n\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"custom-filter mb-4\">\r\n                        <h5 class=\"card-title\">{{'AdminModule.Label.CustomFilters' | translate}}</h5>\r\n                        <div class=\"form-check form-check-custom pl-0\">\r\n                            <label>\r\n                                {{'AdminModule.Label.ShowVSTDesk' | translate}}\r\n                                <input formControlName=\"VSTDeskActive\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                <span class=\"squire-check-mark\"></span>\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"work-item mb-4\">\r\n                        <h5 class=\"card-title\">{{'AdminModule.Label.Layout' | translate}}</h5>\r\n                        <div formGroupName=\"Layout\">\r\n                            <div class=\"form-check radio-checkbox-custom\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.Hierarchical' | translate}}\r\n                                    <input type=\"radio\" class=\"form-check-input\" name=\"optionsRadios\" (click)=\"setradio(0)\" id=\"optionsRadios1\" [checked]=\"adminSettingForm?.controls['Layout'].controls['Hierarchical']?.value\">\r\n                                    <span class=\"circle-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check radio-checkbox-custom\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.Flat' | translate}}\r\n                                    <input type=\"radio\" class=\"form-check-input\" name=\"optionsRadios\" (click)=\"setradio(1)\" id=\"optionsRadios2\" [checked]=\"adminSettingForm?.controls['Layout'].controls['Flat']?.value\">\r\n                                    <span class=\"circle-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"work-item mb-4\">\r\n                        <h5 class=\"card-title\">{{'AdminModule.Label.GridVisibleFields' | translate}}</h5>\r\n                        <div formGroupName=\"GridVisibleFields\">\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.WorkItemId' | translate}}\r\n                                    <input formControlName=\"WorkItemId\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.WorkItemType' | translate}}\r\n                                    <input formControlName=\"WorkItemType\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.Title' | translate}}\r\n                                    <input formControlName=\"Title\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"form-check form-check-custom pl-0\">\r\n                                <label>\r\n                                    {{'AdminModule.Label.State' | translate}}\r\n                                    <input formControlName=\"State\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                    <span class=\"squire-check-mark\"></span>\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!--<div class=\"status mb-4\">\r\n        <h5 class=\"card-title\">{{'AdminModule.Label.Status' | translate}}</h5>\r\n        <div formArrayName=\"WorkItemsState\">\r\n\r\n            <div *ngFor=\"let workItemState of WorkItemStateList.controls; let i=index\" [formGroupName]=\"i\" class=\"form-check form-check-custom pl-0\">\r\n                <label>\r\n                    {{ workItemState.value.Name  | translate}}\r\n                    <input formControlName=\"IsSelected\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                    <span class=\"squire-check-mark\"></span>\r\n                </label>\r\n            </div>\r\n        </div>\r\n    </div>-->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"new-task mb-4\">\r\n                <h5 class=\"card-title\">{{'AdminModule.Label.DefaultValues' | translate}}</h5>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                        <label>{{'AdminModule.Label.State' | translate}}</label>\r\n                        <select class=\"custom-select custom-select-secondary\" formControlName=\"CreatedItemStatus\">\r\n                            <option value=\"\"> -- {{'AdminModule.Select' | translate}} {{'AdminModule.State' | translate}} --</option>\r\n                            <option *ngFor=\"let itemstatus of createdItemsStatus\" [value]=\"itemstatus.Name\">{{ itemstatus.Name}}</option>\r\n                        </select>\r\n                        <div class=\"form-text text-danger\" *ngIf=\"adminSettingForm.get('CreatedItemStatus').hasError('option')\">\r\n                            {{'AdminModule.Validations.SelectState' | translate}}\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <label>{{'AdminModule.Label.WorkItemType' | translate}}</label>\r\n                        <select class=\"custom-select custom-select-secondary\" formControlName=\"CreatedItemType\">\r\n                            <option value=\"\"> -- {{'AdminModule.Select' | translate}} {{'AdminModule.WorkItemType' | translate}} --</option>\r\n                            <option *ngFor=\"let workItem of WorkItemList.controls\" [value]=\"workItem.value.Name\"> {{workItem.value.Name | translate}}</option>\r\n                        </select>\r\n                        <div class=\"form-text text-danger\" *ngIf=\"adminSettingForm.get('CreatedItemType').hasError('option')\">\r\n                            {{'AdminModule.Validations.SelectCreatedWorkItemType' | translate}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <label>{{'AdminModule.Label.AssignedTo' | translate}}</label>\r\n                        <select class=\"custom-select custom-select-secondary\" formControlName=\"DefaultAssignment\">\r\n                            <option value=\"\"> -- {{'AdminModule.Select' | translate}} {{'AdminModule.Assignment' | translate}} --</option>\r\n                            <option *ngFor=\"let member of MemberList\" [value]=\"member\"> {{member | translate}}</option>\r\n                        </select>\r\n                        <div class=\"form-text text-danger\" *ngIf=\"adminSettingForm.get('DefaultAssignment').hasError('option')\">\r\n                            {{'AdminModule.Validations.SelectAssignment' | translate}}\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n\r\n\r\n            <div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\"><h5 class=\"card-title\">{{'AdminModule.Label.CustomStatus' | translate}}</h5></div>\r\n                    <div class=\"col-md-6\"><h5 class=\"card-title\">{{'AdminModule.Label.VSTDeskCustomStatus' | translate}}</h5></div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-1\">\r\n                                <div formArrayName=\"WorkItemsState\">\r\n                                    <div *ngFor=\"let workItemState of WorkItemStateList.controls; let i=index\" [formGroupName]=\"i\" class=\"form-group form-control form-check form-check-custom pl-0\" style=\"border:0px;background-color:transparent\">\r\n                                        <label>\r\n                                            <input formControlName=\"IsSelected\" class=\"form-check-input\" type=\"checkbox\" value=\"\">\r\n                                            <span class=\"squire-check-mark\" style=\"top:7px;left:1px\"></span>\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-11\">\r\n                                <div class=\"custom-status\" formArrayName=\"CustomStatus\">\r\n                                    <div [formGroupName]=\"i\" *ngFor=\"let customStatus of adminSettingForm.controls['CustomStatus'].controls; let i=index\">\r\n                                        <div class=\"form-group\">\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"StatusName\" disabled />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"custom-status\" formArrayName=\"CustomStatus\">\r\n                            <div [formGroupName]=\"i\" *ngFor=\"let customStatus of adminSettingForm.controls['CustomStatus'].controls; let i=index\">\r\n                                <!--<div class=\"col-md-6\">\r\n\r\n                                    <div class=\"form-group\">\r\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"StatusName\" disabled />\r\n                                    </div>\r\n                                </div>-->\r\n\r\n                                <div class=\"form-group\">\r\n                                    <input formControlName=\"DisplayName\" class=\"form-control white-bg\" type=\"text\" id=\"example-text-input\">\r\n                                </div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"adminSettingForm.controls.CustomStatus.controls[i].get('DisplayName').touched && adminSettingForm.controls.CustomStatus.controls[i].get('DisplayName').hasError('required')\">\r\n                                    {{'AdminModule.Validations.Required' | translate}}\r\n                                </div>\r\n                                <div class=\"form-text text-danger\" *ngIf=\"!adminSettingForm.controls.CustomStatus.controls[i].get('DisplayName').hasError('required') && adminSettingForm.controls.CustomStatus.controls[i].get('DisplayName').hasError('textFormat')\">{{'AdminModule.Validations.OnlyCharcters' | translate}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/Admin/project-settings/project-settings.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var ProjectSettingsComponent = /** @class */ (function () {
    function ProjectSettingsComponent(adminService, fb, customValidation, _headerService) {
        this.adminService = adminService;
        this.fb = fb;
        this.customValidation = customValidation;
        this._headerService = _headerService;
        this.isShow = false;
        this.isDisplaySettings = false;
        this.createdItemsStatus = [];
        this.createForm();
    }
    ProjectSettingsComponent.prototype.createForm = function () {
        this.adminSettingForm = this.fb.group({
            Id: [0],
            ProjectId: [0],
            VSTDeskActive: [true],
            CreatedItemStatus: ['', forms_1.Validators.compose([forms_1.Validators.required, this.customValidation.selectOption])],
            CreatedItemType: ['', forms_1.Validators.compose([forms_1.Validators.required, this.customValidation.selectOption])],
            DefaultAssignment: ['', forms_1.Validators.compose([forms_1.Validators.required, this.customValidation.selectOption])],
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
                WorkItemId: [false],
                WorkItemType: [false],
                Title: [false],
                State: [false]
            }),
            WorkItemsState: this.fb.array([]),
            CustomStatus: this.fb.array([
                this.initCustomStatusData()
            ]),
            MemberList: ['']
        });
    };
    ProjectSettingsComponent.prototype.initCustomStatusData = function () {
        return this.fb.group({
            Id: [0],
            projectId: [0],
            StatusName: [''],
            DisplayName: ['', forms_1.Validators.compose([forms_1.Validators.required, this.customValidation.validateCharactersOnly])]
        });
    };
    ProjectSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //getting the list of project from the api
        this.adminService.getProjectList().subscribe(function (res) { if (res)
            _this.projectList = res.Data; });
        //set header data.
        this.setHeaderData();
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'update' && _this.adminSettingForm.invalid == false)
                _this.saveProjectSetting();
        });
    };
    Object.defineProperty(ProjectSettingsComponent.prototype, "WorkItemList", {
        get: function () { return this.adminSettingForm.get('WorkItemsList'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettingsComponent.prototype, "WorkItemStateList", {
        get: function () { return this.adminSettingForm.get('WorkItemsState'); },
        enumerable: true,
        configurable: true
    });
    ProjectSettingsComponent.prototype.initWorkItems = function () {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        });
    };
    //display panel on project selection
    ProjectSettingsComponent.prototype.onSelect = function (data) {
        var headerData;
        if (data != -1) {
            this.isShow = true;
            this.getAdminSettings(data);
            this.isDisplaySettings = true;
        }
        else if (data == -1) {
            this.isDisplaySettings = this.isShow = false;
        }
    };
    ProjectSettingsComponent.prototype.getAdminSettings = function (projectId) {
        var _this = this;
        this.createForm();
        this.adminSettingForm.valueChanges.subscribe(function (res) { _this.setHeaderData(); });
        this.adminService.getAdminSettings(projectId).subscribe(function (res) {
            if (res) {
                _this.createdItemsStatus = res.Data.WorkItemsState;
                var workItemsControls = _this.adminSettingForm.controls["WorkItemsList"];
                var lengthofCustomItem = res.Data.WorkItemsList.length;
                while (lengthofCustomItem--) {
                    workItemsControls.push(_this.initWorkItems());
                }
                _this.adminSettingForm.patchValue({ WorkItemsList: res.Data.WorkItemsList });
                var lengthofCustomItemState = res.Data.WorkItemsState.length;
                var workItemsStateControls = _this.adminSettingForm.controls["WorkItemsState"];
                while (lengthofCustomItemState--) {
                    workItemsStateControls.push(_this.initWorkItems());
                }
                _this.adminSettingForm.patchValue({ WorkItemsState: res.Data.WorkItemsState });
                var dataLength = res.Data.CustomStatus.length;
                var formControl = _this.adminSettingForm.controls["CustomStatus"];
                while (--dataLength) {
                    formControl.push(_this.initCustomStatusData());
                }
                _this.adminSettingForm.patchValue({ CustomStatus: res.Data.CustomStatus });
                _this.adminSettingForm.patchValue({ DefaultAssignment: res.Data.DefaultAssignment });
                _this.adminSettingForm.patchValue({ EditableFields: res.Data.EditableFields });
                _this.adminSettingForm.patchValue({ VSTDeskActive: res.Data.VSTDeskActive });
                _this.adminSettingForm.patchValue({ Layout: res.Data.Layout });
                _this.adminSettingForm.patchValue({ Id: res.Data.Id });
                _this.adminSettingForm.patchValue({ ProjectId: res.Data.ProjectId });
                _this.adminSettingForm.patchValue({ CreatedItemStatus: res.Data.CreatedItemStatus });
                _this.adminSettingForm.patchValue({ CreatedItemType: res.Data.CreatedItemType });
                _this.adminSettingForm.patchValue({ GridVisibleFields: res.Data.GridVisibleFields });
                _this.adminSettingForm.patchValue({ MemberList: res.Data.MemberList });
                _this.MemberList = res.Data.MemberList;
                if (_this.adminSettingForm.controls["DefaultAssignment"].value == null) {
                    _this.adminSettingForm.patchValue({ DefaultAssignment: "" });
                }
                _this.setHeaderData();
            }
        });
    };
    //saving all the updated project settings to database
    ProjectSettingsComponent.prototype.saveProjectSetting = function () {
        this.adminService.setProjectSetting(this.adminSettingForm.value).subscribe(function (res) { });
    };
    ProjectSettingsComponent.prototype.setradio = function (data) {
        if (data == 0)
            this.adminSettingForm.controls['Layout'].patchValue({ Flat: false, Hierarchical: true });
        else
            this.adminSettingForm.controls['Layout'].patchValue({ Flat: true, Hierarchical: false });
    };
    ProjectSettingsComponent.prototype.setHeaderData = function () {
        //create Header Data.
        this.headerData = { Title: "PROJECT SETTINGS" };
        if (this.isShow)
            this.headerData['buttons'] = [{ actionType: 'update', type: "UPDATE SETTINGS", disabled: this.adminSettingForm.invalid, isIcon: false }];
        else
            this.headerData['buttons'] = undefined;
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    ProjectSettingsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    ProjectSettingsComponent = __decorate([
        core_1.Component({
            selector: 'project-settings',
            template: __webpack_require__("../../../../../src/app/Admin/project-settings/project-settings.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, forms_1.FormBuilder, common_1.Validations, header_sevice_1.HeaderService])
    ], ProjectSettingsComponent);
    return ProjectSettingsComponent;
}());
exports.ProjectSettingsComponent = ProjectSettingsComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/user-details/user-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card has-shadow\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\">\r\n            <!-- Nav tabs -->\r\n            <ul class=\"nav tab-nav\">\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#clientUsers\" (click)=\"toggle('client')\">CLIENT USERS </a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#adminstrators\" (click)=\"toggle('admin')\">ADMINISTRATORS</a>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n            <div class=\"tab-content tab-content-custom\">\r\n                <div class=\"tab-pane active\" id=\"clientUsers\">\r\n                    <form (submit)=\"saveUserDeatails()\">\r\n\r\n                        <div class=\"card-body\" [formGroup]=\"userDetails\">\r\n                            <div class=\"action mb-3 d-flex justify-content-between w-100\">\r\n                                <a routerLink=\"/admin/userlist\" class=\"btn btn-primary\"><i class=\"material-icons\">arrow_back_ios</i> Back To Listing</a>\r\n                            </div>\r\n                            <div class=\"form-container\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-lg-3 col-md-6\">\r\n                                        <div class=\"form-group\">\r\n                                            <label>{{'AdminModule.Label.Email' | translate}}</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"Email\" disabled>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-lg-3 col-md-6\">\r\n                                        <div class=\"form-group\">\r\n                                            <label>{{'AdminModule.Label.FirstName' | translate}}</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"FirstName\">\r\n                                            <div class=\"form-text text-danger w-100\" *ngIf=\"userDetails.get('FirstName').touched && userDetails.get('FirstName').hasError('required')\">First Name {{'CoreModule.Validations.Required' | translate}}</div>\r\n                                            <div class=\"form-text text-danger w-100\" *ngIf=\"userDetails.get('FirstName').touched && !userDetails.get('FirstName').hasError('required') && userDetails.get('FirstName').hasError('blankValidation')\">{{'CoreModule.Validations.BlankValidation' | translate}}</div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-lg-3 col-md-6\">\r\n                                        <div class=\"form-group\">\r\n                                            <label>{{'AdminModule.Label.LastName' | translate}}</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"LastName\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-lg-3 col-md-6\">\r\n                                        <div class=\"form-group\">\r\n                                            <label>{{'AdminModule.Label.PhoneNumber' | translate}}</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"PhoneNumber\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n\r\n                                <div class=\"form-group\">\r\n                                    <div formArrayName=\"Projects\" class=\"row\">\r\n                                        <div class=\"col-lg-3 col-md-6\" *ngFor=\"let project of userDetails?.controls['Projects']?.controls; let i=index\" [formGroupName]=\"i\">\r\n                                            <div class=\"form-check form-check-custom pl-0\">\r\n                                                <label>\r\n                                                    <input class=\"form-check-input\" type=\"checkbox\" formControlName=\"IsSelected\">{{userDetails.controls['Projects'].controls[i].controls['Name'].value | translate}}\r\n                                                    <span class=\"squire-check-mark\"></span>\r\n                                                </label>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-text text-danger\" *ngIf=\"userDetails.get('Projects').hasError('multipleCheckboxRequireOne')\">{{'CoreModule.Validations.Select' | translate}}</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"tab-pane fade\" id=\"adminstrators\">\r\n                    <admin-list></admin-list>\r\n                </div>\r\n            </div>\r\n            </div>\r\n        </div>\r\n    \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/Admin/user-details/user-details.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var UserDetailsComponent = /** @class */ (function () {
    function UserDetailsComponent(adminService, router, activatedRoute, route, customValidation, fb, _headerService) {
        this.adminService = adminService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.route = route;
        this.customValidation = customValidation;
        this.fb = fb;
        this._headerService = _headerService;
        this.id = 0;
        this.isDisplayProjectList = false;
        this.userDetails = this.fb.group({
            Id: [],
            PhoneNumber: [''],
            FirstName: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: [''],
            Projects: this.fb.array([this.initProject()
            ], customValidation.multipleCheckboxRequireOne)
        });
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set headerData
        this.setHeaderData();
        //when form value update update the header data
        this.userDetails.valueChanges.subscribe(function (res) {
            _this.setHeaderData();
        });
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'update' && _this.userDetails.invalid == false)
                _this.saveUserDeatails();
        });
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = params['Id'];
            _this.getUserDetails(_this.id);
        });
    };
    UserDetailsComponent.prototype.getUserDetails = function (userid) {
        var _this = this;
        var that = this;
        this.adminService.getUserDetails(this.id).subscribe(function (res) {
            if (res) {
                //this.userDetails = res.Data;
                if (res.Data.Projects) {
                    var dataLength = res.Data.Projects.length;
                    var formControl = that.userDetails.controls["Projects"];
                    while (--dataLength) {
                        formControl.push(_this.initProject());
                    }
                }
                _this.userDetails.patchValue(res.Data);
            }
        });
    };
    UserDetailsComponent.prototype.OnChange = function (e) {
        var isChecked = e.target.checked;
        if (isChecked) {
            this.getProjectsList();
            this.isDisplayProjectList = true;
        }
        else {
            this.isDisplayProjectList = false;
        }
    };
    UserDetailsComponent.prototype.getProjectsList = function () {
    };
    UserDetailsComponent.prototype.initProject = function () {
        return this.fb.group({
            Id: [0],
            Name: [''],
            IsSelected: [false]
        });
    };
    UserDetailsComponent.prototype.saveUserDeatails = function () {
        this.userDetails.patchValue({ Id: this.id });
        this.userDetails.value.FirstName = this.userDetails.value.FirstName.trim();
        this.userDetails.value.LastName = this.userDetails.value.LastName.trim();
        this.adminService.updateUserDetails(this.userDetails.value).subscribe(function (res) {
            if (res.Data) {
                //this.router.navigate(['admin/userlist']);
            }
        });
    };
    UserDetailsComponent.prototype.setHeaderData = function () {
        debugger;
        //create Header Data.
        this.headerData = { Title: "USER DETAILS" };
        this.headerData['buttons'] = [{ actionType: 'update', type: "UPDATE USER", disabled: this.userDetails.invalid, isIcon: false }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    UserDetailsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    UserDetailsComponent = __decorate([
        core_1.Component({
            selector: 'user-details',
            template: __webpack_require__("../../../../../src/app/Admin/user-details/user-details.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, router_1.Router, router_1.ActivatedRoute, router_1.Router, common_1.Validations, forms_1.FormBuilder, header_sevice_1.HeaderService])
    ], UserDetailsComponent);
    return UserDetailsComponent;
}());
exports.UserDetailsComponent = UserDetailsComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/user-list/user-list.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row user-list\">\r\n    <div class=\"col-xl-12\">\r\n        <div class=\"card has-tab has-shadow\">\r\n            <div class=\"card-header\">\r\n                <!-- Nav tabs -->\r\n                <ul class=\"nav tab-nav\">\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#clientUsers\" (click)=\"toggle('client')\">CLIENT USERS </a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#adminstrators\" (click)=\"toggle('admin')\">ADMINISTRATORS</a>\r\n                    </li>\r\n\r\n                </ul>\r\n            </div>\r\n            <div class=\"card-body\">\r\n\r\n                <!-- Tab panes -->\r\n                <div class=\"tab-content tab-content-custom\">\r\n                    <nav aria-label=\"breadcrumb\" *ngIf=\"isClient\" >\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\">\r\n                                <a class=\"btn btn-primary\" href=\"JavaScript: Void(0)\" routerLink=\"/admin/inviteuser\">\r\n                                    <i class=\"material-icons\">\r\n                                        add\r\n                                    </i> {{'AdminModule.Button.AddUser' | translate}}\r\n                                </a>\r\n                            </li>\r\n                        </ol>\r\n                    </nav>\r\n\r\n                    <div class=\"search-container form-container mt-4 mb-2\"  *ngIf=\"isClient\">\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" [(ngModel)]=\"searchText\" (input)=\"searchUser()\" placeholder=\"{{'AdminModule.Placeholder.SearchUser' | translate}}\">\r\n                            <button type=\"button\" (click)=\"searchUser()\" class=\"btn\"> <i class=\"material-icons\">zoom_in</i></button>\r\n\r\n                            <ul class=\"searh-list\">\r\n                                <li class=\"searh-list-item\">\r\n                                    <button type=\"button\" class=\"btn btn-primary btn-sm\">\r\n                                        <i class=\"material-icons\">add</i> ADD USER\r\n                                    </button>\r\n                                    <span class=\"user\">User 01</span>\r\n                                </li>\r\n                                <li class=\"searh-list-item\">\r\n                                    <button type=\"button\" class=\"btn btn-primary btn-sm\">\r\n                                        <i class=\"material-icons\">add</i> ADD USER\r\n                                    </button>\r\n                                    <span class=\"user\">User 01</span>\r\n                                </li>\r\n                                <li class=\"searh-list-item\">\r\n                                    <button type=\"button\" class=\"btn btn-primary btn-sm\">\r\n                                        <i class=\"material-icons\">add</i> ADD USER\r\n                                    </button>\r\n                                    <span class=\"user\">User 01</span>\r\n                                </li>\r\n                                <li class=\"searh-list-item\">\r\n                                    <button type=\"button\" class=\"btn btn-primary btn-sm\">\r\n                                        <i class=\"material-icons\">add</i> ADD USER\r\n                                    </button>\r\n                                    <span class=\"user\">User 01</span>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"tab-pane active\" id=\"clientUsers\">\r\n                        <div class=\"user-list-conainer scroll-x\">\r\n                            <h4 class=\"mb-3 t-header row-custom\">\r\n                                <span class=\"col\">\r\n                                    {{'AdminModule.Label.User' | translate}}<span class=\"badge badge-secondary ml-1\">{{totalUsers}}</span>\r\n                                </span>\r\n                                <!--<span class=\"col\">\r\n                                    Company\r\n                                </span>-->\r\n                            </h4>\r\n                            <ul class=\"list-group list-group-flush\">\r\n                                <li class=\"list-group-item d-flex flex-row px-0 has-edit-button\" *ngFor=\"let user of userList \">\r\n                                    <div class=\"row-custom\">\r\n                                        <div class=\"col\">\r\n                                            <div class=\"user-pic\" [ngStyle]=\"{'background-image': 'url(' + user.ProfilePhoto + ')'}\"></div>\r\n\r\n                                            <div class=\"text\">\r\n\r\n                                                <strong>{{user.FirstName}} {{user.LastName}}</strong>\r\n                                                <p class=\"mb-0 text-muted\">{{user.Email}}</p>\r\n                                            </div>\r\n                                        </div>\r\n                                        <!--<div class=\"col col-50\">\r\n                                            <strong>{{user.ComapanyName}}</strong>\r\n                                        </div>-->\r\n                                    </div>\r\n\r\n                                    <div class=\"buttons-group-holder\">\r\n                                        <button type=\"button\" (click)=\"deleteUser(user.Id)\" class=\"btn btn-primary btn-sm\"><i class=\"material-icons\">delete_forever</i></button>\r\n                                        <button type=\"button\" (click)=\"getUserDetails(user)\" class=\"btn btn-primary btn-sm\"><i class=\"material-icons\">edit</i></button>\r\n                                    </div>\r\n                                </li>\r\n\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"tab-pane fade\" id=\"adminstrators\">\r\n\r\n                       <admin-list></admin-list>\r\n\r\n                    </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/Admin/user-list/user-list.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(adminService, router) {
        this.adminService = adminService;
        this.router = router;
        this.searchText = '';
        this.isClient = true;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getUserList('').subscribe(function (res) {
            if (res) {
                _this.userList = res.Data;
                _this.totalUsers = _this.userList.length;
            }
        });
    };
    UserListComponent.prototype.getUserDetails = function (user) {
        this.router.navigate(['/admin/userdetails'], { queryParams: { Id: user.Id } });
    };
    UserListComponent.prototype.deleteUser = function (userid) {
        var _this = this;
        var confirmflag = this.deleteConfirm();
        if (confirmflag) {
            this.adminService.deleteUser(userid).subscribe(function (res) {
                if (res) {
                    _this.adminService.getUserList('').subscribe(function (res) {
                        if (res) {
                            _this.userList = res.Data;
                            _this.totalUsers = _this.userList.length;
                        }
                    });
                }
            });
        }
    };
    UserListComponent.prototype.deleteConfirm = function () {
        if (confirm("Are you sure you want to delete this user and their associated projects? "))
            return true;
        else
            return false;
    };
    UserListComponent.prototype.searchUser = function () {
        var _this = this;
        this.adminService.getUserList(this.searchText).subscribe(function (res) {
            if (res) {
                _this.userList = res.Data;
                _this.totalUsers = _this.userList.length;
            }
        });
    };
    UserListComponent.prototype.toggle = function (user) {
        this.isClient = user == 'admin' ? false : true;
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            template: __webpack_require__("../../../../../src/app/Admin/user-list/user-list.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, router_1.Router])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/work-item/addwork-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row work-item\">\r\n    <div class=\"col-md-offset-2 col-md-12\">\r\n        <div class=\"card has-shadow\">\r\n            <div class=\"card-body\">\r\n                <div class=\"form-container\" [formGroup]=\"workItemForm\">\r\n                    <div class=\"action mb-3 d-flex justify-content-between w-100\">\r\n                        <button type=\"button\" class=\"btn btn-primary\" routerLink='/admin/userworkitemlist'> <i class=\"material-icons\">arrow_back_ios</i> Return To Work Items</button>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\" *ngIf=\"!isNew\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"#{{workItemId}}\" disabled />\r\n                                <small class=\"text-muted\">ID</small>\r\n                            </div>\r\n                        </div>\r\n                        <div [ngClass]=\"{'col-md-8':!isNew,'col-md-12':isNew}\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"{{'CustomerModule.Placeholder.AddTitle' | translate}}\" formControlName=\"Title\" />\r\n                                <small class=\"text-muted\">{{'CustomerModule.Label.Title' | translate}}</small>\r\n                                <div class=\"form-text text-danger w-100\" *ngIf=\"workItemForm.get('Title').touched && workItemForm.get('Title').hasError('required')\">{{'CustomerModule.Validations.TitleRequired' | translate}}</div>\r\n                                <div class=\"form-text text-danger w-100\" *ngIf=\"workItemForm.get('Title').touched && !workItemForm.get('Title').hasError('required') && workItemForm.get('Title').hasError('blankValidation')\">{{'CoreModule.Validations.BlankValidation' | translate}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <h5 class=\"sub-title\">{{'CustomerModule.Label.Description' | translate}}</h5>\r\n                        <div class=\"textarea-holder\">\r\n                            <ckeditor [config]=\"editorConfig.ConfigSetting\" formControlName=\"Description\" [readonly]=\"!deatilsEditable\"></ckeditor>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group form-group-discussion\">\r\n                        <h5 class=\"sub-title\">{{'CustomerModule.Label.Discussion' | translate}}</h5>\r\n                        <div class=\"textarea-holder\">\r\n                            <div class=\"mb-3\">\r\n\r\n                                <ckeditor [config]=\"editorConfig.DiscriptionConfig\" formControlName=\"Comment\" [readonly]=\"!customerFeedbackEditable\"></ckeditor>\r\n                            </div>\r\n                            <div class=\"box-holder\">\r\n                                <div class=\"box\" *ngFor=\"let item of workItemForm.controls['comments'].controls\">\r\n                                    <strong>{{item.controls['Date'].value}}</strong>\r\n                                    <p class=\"mb-0\">\r\n                                        <strong>USER:</strong> {{item.controls['Name'].value}}\r\n                                    </p>\r\n                                   \r\n                                    <strong >MESSAGE</strong>\r\n                                  \r\n                                    <div  class=\"form-control white-bg mt-1\"  [innerHTML]= \"item.controls['Text'].value\"></div>\r\n                                </div>\r\n                                \r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/Admin/work-item/addwork-item.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var common_2 = __webpack_require__("../../../../../src/app/common/index.ts");
var WorkItemComponent = /** @class */ (function () {
    function WorkItemComponent(adminService, activatedRoute, customValidation, fb, router, _headerService) {
        this.adminService = adminService;
        this.activatedRoute = activatedRoute;
        this.customValidation = customValidation;
        this.fb = fb;
        this.router = router;
        this._headerService = _headerService;
        this.titleEditable = true;
        this.customerFeedbackEditable = true;
        this.deatilsEditable = true;
        this.workItemId = 0;
        this.isNew = true;
        this.editorConfig = common_1.CkEditorConfig;
        this.workItemForm = fb.group({
            Id: [0],
            ProjectId: [''],
            Title: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateNoBlankValues])],
            State: [''],
            Description: [''],
            WorkItemId: [''],
            Comment: [''],
            comments: this.fb.array([])
        });
    }
    WorkItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set headerData.
        this.setHeaderData();
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'add')
                _this.createWorkItem();
        });
        //when form value update update the header data
        this.workItemForm.valueChanges.subscribe(function (res) {
            _this.setHeaderData();
        });
        var that = this;
        var url = this.router.url;
        this.projectId = url.substr((url.lastIndexOf('/') + 1));
        this.activatedRoute.data.subscribe(function (res) {
            that.isNew = res.isNew;
            var routerData = _this.router.routerState.snapshot.url.split('/');
            if (res.isNew) {
                that.projectId = routerData[3];
            }
            else {
                that.projectId = routerData[3];
                that.workItemId = Number(routerData[5]);
                _this.getWorkItemDetail();
                _this.getEditableItems(that.projectId);
            }
        });
    };
    WorkItemComponent.prototype.initCommentList = function () {
        return this.fb.group({
            Name: [''],
            Text: [''],
            Date: ['']
        });
    };
    WorkItemComponent.prototype.createWorkItem = function () {
        var _this = this;
        this.workItemForm.controls['Title'].enable();
        this.workItemForm.patchValue({ Id: this.projectId, WorkItemId: this.workItemId });
        if (this.titleEditable)
            this.workItemForm.value.Title = this.workItemForm.value.Title.trim();
        this.adminService.createWorkItem(this.workItemForm.value, this.projectId).subscribe(function (res) {
            if (res.Data) {
                _this.router.navigateByUrl('/admin/userworkitemlist');
            }
        });
    };
    WorkItemComponent.prototype.getWorkItemDetail = function () {
        var _this = this;
        this.adminService.getWorkItem(this.projectId, this.workItemId).subscribe(function (res) {
            if (res) {
                _this.workItemForm.patchValue(res.Data);
                var length_1 = res.Data.CommentList.length;
                var control = _this.workItemForm.controls['comments'];
                while (length_1--) {
                    control.push(_this.initCommentList());
                }
                _this.workItemForm.patchValue({ comments: res.Data.CommentList });
            }
        });
    };
    WorkItemComponent.prototype.updateWorkItem = function () {
        var _this = this;
        this.workItemForm.patchValue({ Id: this.projectId, WorkItemId: this.workItemId });
        this.adminService.createWorkItem(this.workItemForm.getRawValue(), this.projectId).subscribe(function (res) {
            if (res.Data) {
                _this.router.navigateByUrl('/workitemlist');
            }
        });
    };
    WorkItemComponent.prototype.getEditableItems = function (projectId) {
        var _this = this;
        var that = this;
        this.adminService.GetEditableItems(projectId).subscribe(function (res) {
            if (res.Data) {
                _this.titleEditable = res.Data.Title;
                _this.deatilsEditable = res.Data.Details;
                _this.customerFeedbackEditable = res.Data.CustomerFeedback;
                if (!res.Data.Title) {
                    that.workItemForm.controls['Title'].disable();
                }
            }
        });
    };
    WorkItemComponent.prototype.setHeaderData = function () {
        //create Header Data.
        this.headerData = { Title: "WORK ITEM" };
        this.headerData['buttons'] = [{ actionType: 'add', type: "Save", disabled: this.workItemForm.invalid, isIcon: false }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    WorkItemComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    WorkItemComponent = __decorate([
        core_1.Component({
            selector: 'addwork-item-admin',
            template: __webpack_require__("../../../../../src/app/Admin/work-item/addwork-item.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, router_1.ActivatedRoute, common_2.Validations, forms_1.FormBuilder, router_1.Router, header_sevice_1.HeaderService])
    ], WorkItemComponent);
    return WorkItemComponent;
}());
exports.WorkItemComponent = WorkItemComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/workitemlist/workitem-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card has-shadow\">\r\n    <div class=\"card-body\">\r\n        <form [formGroup]=\"searchItemForm\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div *ngIf=\"projects.Project.length > 1\" class=\"form-group\">\r\n                                <select class=\"custom-select custom-select-secondary white-bg\" formControlName=\"ProjectId\">\r\n                                    <option *ngFor=\"let item of projects.Project\" [ngValue]=\"item.Id\">{{item.Name}}</option>\r\n                                </select>\r\n                                <small class=\"text-muted\">Project</small>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <select class=\"custom-select custom-select-secondary white-bg\" formControlName=\"ProjectStatus\">\r\n                                    <option value=\"Select\">  Select State  </option>\r\n                                    <option *ngFor=\"let item of projects.projectStatus\" [ngValue]=\"item\">{{item}}</option>\r\n                                </select>\r\n                                <small class=\"text-muted\">State</small>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n\r\n                    <div class=\"search-container form-container\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search By Title\" formControlName=\"Title\" />\r\n                            <button type=\"button\" class=\"btn\"> <i class=\"material-icons\">zoom_in</i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n\r\n\r\n        <kendo-grid [data]=\"gridView\" [pageSize]=\"pageSize\" [skip]=\"skip\" [pageable]=\"true\" [selectable]=\"true\" (pageChange)=\"pageChange($event)\"\r\n                    (selectionChange)=\"selectedRowChange($event)\" [height]=\"410\">\r\n            <kendo-grid-column field=\"Field.WorkItemType\" title=\"{{'CustomerModule.Label.WorkItemType' | translate}}\" width=\"125\" *ngIf=\"showWorkItemType\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.Id\" title=\"Id\" width=\"60\" *ngIf=\"showWorkItemId\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.Title\" class=\"link\" title=\"{{'CustomerModule.Label.Title' | translate}}\" width=\"300\" *ngIf=\"showTitle\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.State\" title=\"{{'CustomerModule.Label.State' | translate}}\" width=\"100\" *ngIf=\"showState\">\r\n            </kendo-grid-column>\r\n\r\n            <div *kendoGridDetailTemplate=\"let dataItem\">\r\n                <workitem-listchild-admin *ngIf=\"dataItem.ChildList.length>0\" [childList]=\"dataItem.ChildList\"></workitem-listchild-admin>\r\n            </div>\r\n\r\n        </kendo-grid>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/Admin/workitemlist/workitem-list.component.ts":
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
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var WorkItemListComponent = /** @class */ (function () {
    function WorkItemListComponent(adminService, router, fb, _headerService) {
        this.adminService = adminService;
        this.router = router;
        this.fb = fb;
        this._headerService = _headerService;
        this.childItem = [];
        this.projects = common_1.Projects;
        this.pageSize = 10;
        this.skip = 0;
        this.showWorkItemId = true;
        this.showWorkItemType = true;
        this.showTitle = true;
        this.showState = true;
        this.projects.projectStatus = [];
        this.searchItemForm = this.fb.group({
            Title: [''],
            ProjectId: [''],
            ProjectStatus: ['Select']
        });
    }
    WorkItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set header data.
        this.setHeaderData();
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (data) {
            if (data == 'add')
                _this.addNewWorkItem();
        });
        this.adminService.getProjectList().subscribe(function (res) {
            if (res) {
                _this.projects.Project = res.Data.map(function (o) { return { Id: o.Id, Name: o.Name }; });
                common_1.Projects.resetProjectList(_this.projects.Project);
                if (!common_1.Projects.selectedProjectId) {
                    common_1.Projects.setSelectedProject(common_1.Projects.Project[0].Id);
                }
                common_1.DataModel.ProjectId = common_1.Projects.selectedProjectId;
                if (_this.projects.projectStatus.length == 0) {
                    _this.getProjectStatus(_this.projects.selectedProjectId);
                }
                var that = _this;
                _this.loadData();
                _this.getGridColumnFields();
                _this.searchItemForm = _this.fb.group({
                    Title: [''],
                    ProjectId: [''],
                    ProjectStatus: ['Select']
                });
                _this.searchItemForm.patchValue({ ProjectId: _this.projects.selectedProjectId });
                _this.searchItemForm.controls['Title'].valueChanges.debounceTime(500).subscribe(function (res) {
                    _this.SearchItembyTitleAndState(res, _this.searchItemForm.controls['ProjectStatus'].value);
                });
                _this.searchItemForm.controls['ProjectId'].valueChanges.debounceTime(500).subscribe(function (res) {
                    _this.projects.setSelectedProject(res);
                    _this.getProjectStatus(res);
                    common_1.DataModel.ProjectId = res;
                    _this.loadData();
                    _this.getGridColumnFields();
                });
                _this.searchItemForm.controls['ProjectStatus'].valueChanges.debounceTime(300).subscribe(function (res) {
                    _this.SearchItembyTitleAndState(_this.searchItemForm.controls['Title'].value, res);
                });
            }
        });
    };
    WorkItemListComponent.prototype.getProjectStatus = function (id) {
        var that = this;
        this.adminService.getProjectStatusByProjectId(id).subscribe(function (res) {
            that.projects.projectStatus = [];
            that.projects.projectStatus.push.apply(that.projects.projectStatus, res.Data);
        });
    };
    WorkItemListComponent.prototype.loadData = function () {
        var _this = this;
        this.adminService.getProjectWorkItem(common_1.DataModel.ProjectId).subscribe(function (res) {
            if (res && res.Data.Items) {
                _this.items = res.Data.Items;
                _this.gridItem = res.Data.Items;
                _this.setGrid();
            }
        });
    };
    WorkItemListComponent.prototype.getGridColumnFields = function () {
        var _this = this;
        this.adminService.getGridColumnFields(common_1.DataModel.ProjectId).subscribe(function (res) {
            if (res && res.Data) {
                _this.showWorkItemId = res.Data.WorkItemId;
                _this.showWorkItemType = res.Data.WorkItemType;
                _this.showTitle = res.Data.Title;
                _this.showState = res.Data.State;
                _this.setGrid();
            }
        });
    };
    WorkItemListComponent.prototype.setGrid = function () {
        if (this.gridItem) {
            this.gridView = {
                data: this.gridItem.slice(this.skip, this.skip + this.pageSize),
                total: this.gridItem.length
            };
            this.gridView.data.forEach(function (data) { if (data.Field.Id == 0) {
                data.Field.Id = '';
            } });
        }
    };
    WorkItemListComponent.prototype.pageChange = function (event) {
        this.skip = event.skip;
        this.setGrid();
    };
    WorkItemListComponent.prototype.selectedRowChange = function (selectionEvent) {
        var selectedItem = selectionEvent.selectedRows[0]["dataItem"]; //this.gridView.data[selectionEvent.index];
        if (selectedItem["Field"]["Id"] > 0)
            this.router.navigate(['admin', 'project', common_1.DataModel.ProjectId, 'workitem', selectedItem["Field"]["Id"], 'edit']);
    };
    WorkItemListComponent.prototype.addNewWorkItem = function () {
        this.router.navigate(['admin', 'project', common_1.DataModel.ProjectId, 'workitem', 'add']);
    };
    WorkItemListComponent.prototype.SearchItembyTitleAndState = function (title, state) {
        var that = this;
        this.skip = 0;
        that.childItem = [];
        var parentItem;
        if (title && state && state != "Select") {
            parentItem = this.items.filter(function (x) { return x.Field.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; });
            if (parentItem.length > 0) {
                parentItem.forEach(function (element) {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(function (x) { return x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; }) : [];
                });
            }
            this.items.forEach(function (ele) {
                var item = ele.ChildList.length > 0 ? ele.ChildList.filter(function (x) { return x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; }) : [];
                that.childItem.push.apply(that.childItem, item);
            });
            for (var _i = 0, parentItem_1 = parentItem; _i < parentItem_1.length; _i++) {
                var item = parentItem_1[_i];
                var subItems = item['ChildList'];
                for (var _a = 0, subItems_1 = subItems; _a < subItems_1.length; _a++) {
                    var subItem = subItems_1[_a];
                    var index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }
            for (var _b = 0, _c = that.childItem; _b < _c.length; _b++) {
                var item = _c[_b];
                var obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                };
                parentItem.push(obj);
            }
            var searchPrentItem = parentItem;
            that.childItem = [];
            parentItem = searchPrentItem.filter(function (x) { return x.Field.State.toLowerCase().indexOf(state.toLowerCase()) > -1; });
            if (parentItem.length > 0) {
                parentItem.forEach(function (element) {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(function (x) { return x.State.toLowerCase().indexOf(state.toLowerCase()) > -1; }) : [];
                });
            }
            searchPrentItem.forEach(function (ele) {
                var item = ele.ChildList.length > 0 ? ele.ChildList.filter(function (x) { return x.State.toLowerCase().indexOf(state.toLowerCase()) > -1; }) : [];
                that.childItem.push.apply(that.childItem, item);
            });
            for (var _d = 0, parentItem_2 = parentItem; _d < parentItem_2.length; _d++) {
                var item = parentItem_2[_d];
                var subItems = item['ChildList'];
                for (var _e = 0, subItems_2 = subItems; _e < subItems_2.length; _e++) {
                    var subItem = subItems_2[_e];
                    var index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }
            for (var _f = 0, _g = that.childItem; _f < _g.length; _f++) {
                var item = _g[_f];
                var obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                };
                parentItem.push(obj);
            }
        }
        else if (title) {
            parentItem = this.items.filter(function (x) { return x.Field.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; });
            if (parentItem.length > 0) {
                parentItem.forEach(function (element) {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(function (x) { return x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; }) : [];
                });
            }
            this.items.forEach(function (ele) {
                var item = ele.ChildList.length > 0 ? ele.ChildList.filter(function (x) { return x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1; }) : [];
                that.childItem.push.apply(that.childItem, item);
            });
            for (var _h = 0, parentItem_3 = parentItem; _h < parentItem_3.length; _h++) {
                var item = parentItem_3[_h];
                var subItems = item['ChildList'];
                for (var _j = 0, subItems_3 = subItems; _j < subItems_3.length; _j++) {
                    var subItem = subItems_3[_j];
                    var index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }
            for (var _k = 0, _l = that.childItem; _k < _l.length; _k++) {
                var item = _l[_k];
                var obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                };
                parentItem.push(obj);
            }
        }
        else if (state && state != "Select") {
            parentItem = this.items.filter(function (x) { return x.Field.State.toLowerCase() == state.toLowerCase(); });
            if (parentItem.length > 0) {
                parentItem.forEach(function (element) {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(function (x) { return x.State.toLowerCase() == state.toLowerCase(); }) : [];
                });
            }
            this.items.forEach(function (ele) {
                var item = ele.ChildList.length > 0 ? ele.ChildList.filter(function (x) { return x.State.toLowerCase() == state.toLowerCase(); }) : [];
                that.childItem.push.apply(that.childItem, item);
            });
            for (var _m = 0, parentItem_4 = parentItem; _m < parentItem_4.length; _m++) {
                var item = parentItem_4[_m];
                var subItems = item['ChildList'];
                for (var _o = 0, subItems_4 = subItems; _o < subItems_4.length; _o++) {
                    var subItem = subItems_4[_o];
                    var index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }
            for (var _p = 0, _q = that.childItem; _p < _q.length; _p++) {
                var item = _q[_p];
                var obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                };
                parentItem.push(obj);
            }
        }
        else {
            parentItem = this.items;
        }
        this.gridItem = parentItem;
        this.setGrid();
    };
    WorkItemListComponent.prototype.setHeaderData = function () {
        //create Header Data.
        this.headerData = { Title: "WORK ITEMS" };
        this.headerData['buttons'] = [{ actionType: 'add', type: "ADD WORK ITEM", disabled: false, isIcon: true, iconText: 'add' }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    };
    WorkItemListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    WorkItemListComponent = __decorate([
        core_1.Component({
            selector: 'app-work-item-list-admin',
            template: __webpack_require__("../../../../../src/app/Admin/workitemlist/workitem-list.component.html")
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService, router_1.Router, forms_1.FormBuilder, header_sevice_1.HeaderService])
    ], WorkItemListComponent);
    return WorkItemListComponent;
}());
exports.WorkItemListComponent = WorkItemListComponent;


/***/ }),

/***/ "../../../../../src/app/Admin/workitemlist/workitem-listchild.component.html":
/***/ (function(module, exports) {

module.exports = "<kendo-grid [data]=\"gridData\"\r\n            [pageSize]=\"pageSize\"\r\n            [skip]=\"skip\"\r\n            [pageable]=\"true\"\r\n            [selectable]=\"true\"\r\n            (selectionChange)=\"selectedRowChange($event)\"\r\n            (pageChange)=\"pageChange($event)\"\r\n             [height]=\"150\"\r\n              >\r\n    <kendo-grid-column field=\"WorkItemType\" title=\"{{'CustomerModule.Label.WorkItemType' | translate}}\" width=\"50\" *ngIf=\"showWorkItemType\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"Id\" title=\"Id\" width=\"50\" *ngIf=\"showWorkItemId\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"Title\" class=\"link\" title=\"{{'CustomerModule.Label.Title' | translate}}\" width=\"290\" *ngIf=\"showTitle\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"State\" title=\"{{'CustomerModule.Label.State' | translate}}\" width=\"100\" *ngIf=\"showState\">\r\n    </kendo-grid-column>\r\n</kendo-grid>"

/***/ }),

/***/ "../../../../../src/app/Admin/workitemlist/workitem-listchild.component.ts":
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
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
var WorkItemChildListComponent = /** @class */ (function () {
    function WorkItemChildListComponent(router, adminService) {
        this.router = router;
        this.adminService = adminService;
        this.projects = common_1.Projects;
        this.showWorkItemId = true;
        this.showWorkItemType = true;
        this.showTitle = true;
        this.showState = true;
        this.pageSize = 5;
        this.skip = 0;
    }
    WorkItemChildListComponent.prototype.ngOnInit = function () {
        this.loadData();
        this.getGridColumnFields();
    };
    WorkItemChildListComponent.prototype.loadData = function () {
        this.gridData = {
            data: this.childList.slice(this.skip, this.skip + this.pageSize),
            total: this.childList.length
        };
    };
    WorkItemChildListComponent.prototype.getGridColumnFields = function () {
        var _this = this;
        this.adminService.getGridColumnFields(this.projects.selectedProjectId).subscribe(function (res) {
            if (res && res.Data) {
                _this.showWorkItemId = res.Data.WorkItemId;
                _this.showWorkItemType = res.Data.WorkItemType;
                _this.showTitle = res.Data.Title;
                _this.showState = res.Data.State;
            }
        });
    };
    WorkItemChildListComponent.prototype.pageChange = function (event) {
        this.skip = event.skip;
        this.loadData();
    };
    WorkItemChildListComponent.prototype.dataStateChange = function (_a) {
        var skip = _a.skip, take = _a.take, sort = _a.sort;
        this.skip = skip;
        this.pageSize = take;
        this.loadData();
    };
    WorkItemChildListComponent.prototype.selectedRowChange = function (selectionEvent) {
        //let selectedItem = this.gridData.data[selectionEvent.index];
        //this.router.navigateByUrl('/admin/project/' + this.projects.selectedProjectId + '/workitem/' + selectedItem["Id"] + '/edit');
        this.router.navigateByUrl('/admin/project/' + this.projects.selectedProjectId + '/workitem/' + selectionEvent.selectedRows[0].dataItem.Id + '/edit');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WorkItemChildListComponent.prototype, "childList", void 0);
    WorkItemChildListComponent = __decorate([
        core_1.Component({
            selector: 'workitem-listchild-admin',
            template: __webpack_require__("../../../../../src/app/Admin/workitemlist/workitem-listchild.component.html")
        }),
        __metadata("design:paramtypes", [router_1.Router, admin_service_1.AdminService])
    ], WorkItemChildListComponent);
    return WorkItemChildListComponent;
}());
exports.WorkItemChildListComponent = WorkItemChildListComponent;


/***/ })

});
//# sourceMappingURL=admin.module.chunk.js.map