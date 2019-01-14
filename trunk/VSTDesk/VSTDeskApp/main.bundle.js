webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../Admin/admin.module": [
		"../../../../../src/app/Admin/admin.module.ts",
		"common",
		"admin.module"
	],
	"../Customer/customer.module": [
		"../../../../../src/app/Customer/customer.module.ts",
		"common",
		"customer.module"
	],
	"./core/core.module": [
		"../../../../../src/app/core/core.module.ts",
		"core.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/Admin/services/admin.service.ts":
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
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.getProjectList = function () {
        return this.http.get('api/Project/getprojectslist');
    };
    AdminService.prototype.getAdminSettings = function (projectId) {
        return this.http.get('api/project/getprojectsettings?projectId=' + projectId);
    };
    AdminService.prototype.setProjectSetting = function (data) {
        return this.http.put('api/Project/updateprojectsettings', data);
    };
    AdminService.prototype.sendInvite = function (data) {
        return this.http.post('api/account/sendinvite', data);
    };
    AdminService.prototype.isUserEmailExists = function (data) {
        return this.http.get('api/account/useremailexist?emailId=' + data);
    };
    AdminService.prototype.isUserNameExists = function (data) {
        return this.http.get('api/account/verifyusername?userName=' + data);
    };
    AdminService.prototype.getUserList = function (data) {
        return this.http.get('api/user/getuserlist?search=' + data);
    };
    AdminService.prototype.getAdminUserList = function () {
        return this.http.get('api/user/getadminuserlist');
    };
    AdminService.prototype.getUserDetails = function (data) {
        return this.http.get('api/user/getuseraddprojectdetail?userId=' + data);
    };
    AdminService.prototype.SyncProject = function () {
        return this.http.post('api/project/syncprojects', {});
    };
    AdminService.prototype.updateUserDetails = function (data) {
        return this.http.post('api/user/updateuserandprojects', data);
    };
    AdminService.prototype.getUsersByProject = function () {
        return this.http.get('api/project/getusersbyproject');
    };
    AdminService.prototype.deleteUser = function (data) {
        return this.http.delete('api/user/deleteusers?userId=' + data);
    };
    AdminService.prototype.getCompanySettings = function () {
        return this.http.get('api/account/getcompanysettings');
    };
    AdminService.prototype.setCompanySettings = function (data) {
        return this.http.post('api/account/savecompanysettings', data);
    };
    AdminService.prototype.getChartData = function (data) {
        return this.http.get('api/project/getchartsdata/project/' + data);
    };
    AdminService.prototype.getProjectStatusByProjectId = function (projectId) {
        return this.http.get('api/project/projectstatus/project/' + projectId);
    };
    AdminService.prototype.getProjectWorkItem = function (projectId) {
        return this.http.get('api/worktitems/getprojectworkitems/project/' + projectId);
    };
    AdminService.prototype.getGridColumnFields = function (projectId) {
        return this.http.get('api/project/getgridcolumnfields/project/' + projectId);
    };
    AdminService.prototype.createWorkItem = function (data, projectId) {
        return this.http.post('api/worktitems/createworkitem/project/' + projectId, data);
    };
    AdminService.prototype.getWorkItem = function (projectId, workItemId) {
        return this.http.get('api/worktitems/getprojectworkitembyid/project/' + projectId + '/workitem/' + workItemId);
    };
    AdminService.prototype.GetEditableItems = function (projectId) {
        return this.http.get('api/project/getEditableItems/project/' + projectId);
    };
    AdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"my-container\">\r\n    <ngx-loading [show]=\"isLoading\"></ngx-loading>  \r\n</div>\r\n<toaster-container   [toasterconfig]=\"toasterconfig\"></toaster-container>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var angular5_toaster_1 = __webpack_require__("../../../../angular5-toaster/dist/bundles/angular5-toaster.umd.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(cdRef, toasterService, apiInterceptor, translate) {
        this.cdRef = cdRef;
        this.toasterService = toasterService;
        this.translate = translate;
        this.isLoading = false;
        this.toasterconfig = new angular5_toaster_1.ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 2000
        });
        this.title = 'app';
        var that = this;
        apiInterceptor[1].message$.subscribe(function (res) {
            if (res['type'] != '') {
                that.ShowToaster(res);
            }
            apiInterceptor[1].loading$.subscribe(function (res) {
                if (res > 0) {
                    that.isLoading = true;
                }
                else {
                    that.isLoading = false;
                }
            });
        });
        var browserLang = translate.getBrowserLang();
        // Set the app language
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    AppComponent.prototype.ngOnInit = function () {
        var that = this;
    };
    // popToast() {
    //   this.toasterService.pop('error', '', 'Args Body');
    // }
    AppComponent.prototype.ShowToaster = function (res) {
        var message = '';
        for (var _i = 0, _a = res['message']; _i < _a.length; _i++) {
            var result = _a[_i];
            if (result && result != '') {
                this.toasterService.pop(res['type'], '', result);
            }
        }
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __param(2, core_1.Inject(http_1.HTTP_INTERCEPTORS)),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_a = typeof angular5_toaster_1.ToasterService !== "undefined" && angular5_toaster_1.ToasterService) === "function" && _a || Object, common_1.ApiInterceptor, common_1.TranslateService])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var ngx_perfect_scrollbar_1 = __webpack_require__("../../../../ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
var angular5_toaster_1 = __webpack_require__("../../../../angular5-toaster/dist/bundles/angular5-toaster.umd.js"); //src/toaster.module';
var ng2_ckeditor_1 = __webpack_require__("../../../../ng2-ckeditor/lib/ng2-ckeditor.js");
var ngx_loading_1 = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
var app_routes_1 = __webpack_require__("../../../../../src/app/app.routes.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var admin_service_1 = __webpack_require__("../../../../../src/app/Admin/services/admin.service.ts");
function translateData(config) {
    return function () { return config.load(); };
}
exports.translateData = translateData;
function loadProject(config) {
    return function () { return config.load(); };
}
exports.loadProject = loadProject;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                angular5_toaster_1.ToasterModule,
                ng2_ckeditor_1.CKEditorModule,
                common_1.CommonCustomModule,
                app_routes_1.AppRoutes,
                animations_1.BrowserAnimationsModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                ngx_loading_1.LoadingModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                common_1.TranslateService,
                common_1.CommonServices,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: common_1.ApiInterceptor,
                    multi: true
                },
                {
                    provide: core_1.APP_INITIALIZER, useFactory: translateData, deps: [common_1.TranslateService], multi: true
                },
                {
                    provide: core_1.APP_INITIALIZER, useFactory: loadProject, deps: [common_1.CommonServices], multi: true
                },
                common_1.Validations,
                admin_service_1.AdminService
            ],
            exports: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
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
var routes = [
    { path: 'not-found', component: common_1.NotFoundComponent },
    { path: 'forbidden', component: common_1.ForbiddenComponent },
    { path: '', loadChildren: './core/core.module#CoreModule' },
];
var AppRoutes = /** @class */ (function () {
    function AppRoutes() {
    }
    AppRoutes = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutes);
    return AppRoutes;
}());
exports.AppRoutes = AppRoutes;


/***/ }),

/***/ "../../../../../src/app/common/common.module.ts":
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
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var ngx_perfect_scrollbar_1 = __webpack_require__("../../../../ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
var kendo_angular_upload_1 = __webpack_require__("../../../../@progress/kendo-angular-upload/dist/es/index.js");
var not_found_component_1 = __webpack_require__("../../../../../src/app/common/not-found/not-found.component.ts");
var forbidden_component_1 = __webpack_require__("../../../../../src/app/common/forbidden/forbidden.component.ts");
var login_authguard_1 = __webpack_require__("../../../../../src/app/common/lib/login_authguard.ts");
var permission_authguard_1 = __webpack_require__("../../../../../src/app/common/lib/permission_authguard.ts");
var translate_pipe_1 = __webpack_require__("../../../../../src/app/common/translate/translate.pipe.ts");
var user_profile_component_1 = __webpack_require__("../../../../../src/app/common/user-profile/user-profile.component.ts");
var core_menu_1 = __webpack_require__("../../../../../src/app/core-menu/index.ts");
var CommonCustomModule = /** @class */ (function () {
    function CommonCustomModule() {
    }
    CommonCustomModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, router_1.RouterModule, ngx_perfect_scrollbar_1.PerfectScrollbarModule, kendo_angular_upload_1.UploadModule],
            declarations: [
                not_found_component_1.NotFoundComponent,
                forbidden_component_1.ForbiddenComponent,
                core_menu_1.SideNavComponent,
                core_menu_1.FooterComponent,
                core_menu_1.SidenavMenuItemComponent,
                translate_pipe_1.TranslatePipe,
                user_profile_component_1.UserProfileComponent
            ],
            exports: [
                not_found_component_1.NotFoundComponent,
                forbidden_component_1.ForbiddenComponent,
                core_menu_1.SideNavComponent,
                core_menu_1.FooterComponent,
                core_menu_1.SidenavMenuItemComponent,
                translate_pipe_1.TranslatePipe,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                user_profile_component_1.UserProfileComponent
            ],
            providers: [
                login_authguard_1.LoginAuthGuard,
                core_menu_1.SideNavService,
                permission_authguard_1.PermissionAuthGuard
            ]
        })
    ], CommonCustomModule);
    return CommonCustomModule;
}());
exports.CommonCustomModule = CommonCustomModule;


/***/ }),

/***/ "../../../../../src/app/common/forbidden/forbidden.component.html":
/***/ (function(module, exports) {

module.exports = "<div> You are not authorized access </div>"

/***/ }),

/***/ "../../../../../src/app/common/forbidden/forbidden.component.ts":
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
var ForbiddenComponent = /** @class */ (function () {
    function ForbiddenComponent() {
    }
    ForbiddenComponent = __decorate([
        core_1.Component({
            selector: 'forbidden',
            template: __webpack_require__("../../../../../src/app/common/forbidden/forbidden.component.html")
        })
    ], ForbiddenComponent);
    return ForbiddenComponent;
}());
exports.ForbiddenComponent = ForbiddenComponent;


/***/ }),

/***/ "../../../../../src/app/common/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var not_found_component_1 = __webpack_require__("../../../../../src/app/common/not-found/not-found.component.ts");
exports.NotFoundComponent = not_found_component_1.NotFoundComponent;
var common_module_1 = __webpack_require__("../../../../../src/app/common/common.module.ts");
exports.CommonCustomModule = common_module_1.CommonCustomModule;
var forbidden_component_1 = __webpack_require__("../../../../../src/app/common/forbidden/forbidden.component.ts");
exports.ForbiddenComponent = forbidden_component_1.ForbiddenComponent;
var api_interceptor_1 = __webpack_require__("../../../../../src/app/common/interceptor/api-interceptor.ts");
exports.ApiInterceptor = api_interceptor_1.ApiInterceptor;
var login_authguard_1 = __webpack_require__("../../../../../src/app/common/lib/login_authguard.ts");
exports.LoginAuthGuard = login_authguard_1.LoginAuthGuard;
var permission_authguard_1 = __webpack_require__("../../../../../src/app/common/lib/permission_authguard.ts");
exports.PermissionAuthGuard = permission_authguard_1.PermissionAuthGuard;
var userRoles_1 = __webpack_require__("../../../../../src/app/common/utility/userRoles.ts");
exports.UserRoles = userRoles_1.UserRoles;
var translate_service_1 = __webpack_require__("../../../../../src/app/common/translate/translate.service.ts");
exports.TranslateService = translate_service_1.TranslateService;
var translate_pipe_1 = __webpack_require__("../../../../../src/app/common/translate/translate.pipe.ts");
exports.TranslatePipe = translate_pipe_1.TranslatePipe;
var Vaildations_1 = __webpack_require__("../../../../../src/app/common/lib/validations/Vaildations.ts");
exports.Validations = Vaildations_1.Validations;
var ck_editorconfig_1 = __webpack_require__("../../../../../src/app/common/lib/ck-editorconfig.ts");
exports.CkEditorConfig = ck_editorconfig_1.CkEditorConfig;
var dataModel_1 = __webpack_require__("../../../../../src/app/common/utility/dataModel.ts");
exports.DataModel = dataModel_1.DataModel;
var project_1 = __webpack_require__("../../../../../src/app/common/lib/project.ts");
exports.Projects = project_1.Projects;
exports.UserProfile = project_1.UserProfile;
var common_services_1 = __webpack_require__("../../../../../src/app/common/services/common.services.ts");
exports.CommonServices = common_services_1.CommonServices;
var user_profile_component_1 = __webpack_require__("../../../../../src/app/common/user-profile/user-profile.component.ts");
exports.UserProfileComponent = user_profile_component_1.UserProfileComponent;


/***/ }),

/***/ "../../../../../src/app/common/interceptor/api-interceptor.ts":
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
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/do.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
__webpack_require__("../../../../rxjs/_esm5/add/observable/empty.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/finally.js");
var common_services_1 = __webpack_require__("../../../../../src/app/common/services/common.services.ts");
var ApiInterceptor = /** @class */ (function () {
    function ApiInterceptor(router, commonService) {
        this.router = router;
        this.commonService = commonService;
        this.loginUrl = '/token';
        this.userProfileUrl = "api/user/uploadimage";
        this.companyUploadSaveUrl = "api/account/uploadimage";
        this.profileImageUploadUrl = "api/account/uploadimage?type=profileimage";
        this.backgroundImageForLoginUploadUrl = "api/account/uploadimage?type=backgroundimage";
        this.headerLogoUploadUrl = "api/account/uploadimage?type=headerlogo";
        this.toasterMessage = new rxjs_1.BehaviorSubject(new Object({ type: '', message: '' }));
        this.message$ = this.toasterMessage.asObservable();
        this.index = 0;
        this.loading = new rxjs_1.BehaviorSubject(0);
        this.loading$ = this.loading.asObservable();
    }
    ApiInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(this.setAuthorizationHeader(req))
            .do(function (event) {
            if (event instanceof http_1.HttpResponse) {
                _this.createMessage('success', [event.body.Message]);
            }
        })
            .catch(function (event) {
            if (event instanceof http_1.HttpErrorResponse)
                return _this.catchError(event);
        })
            .finally(function () {
            _this.loading.next(--_this.index);
        });
    };
    ApiInterceptor.prototype.setAuthorizationHeader = function (req) {
        this.loading.next(++this.index);
        switch (req.url) {
            case this.loginUrl:
                return req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            case this.userProfileUrl:
                var usertoken = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {};
                return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + usertoken } });
            case this.companyUploadSaveUrl:
            case this.profileImageUploadUrl:
            case this.headerLogoUploadUrl:
            case this.backgroundImageForLoginUploadUrl:
                var usertoken1 = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {};
                return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + usertoken1 } });
            default:
                var token = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization'))['token'] : {};
                return req.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } });
        }
    };
    ApiInterceptor.prototype.catchError = function (error) {
        if (error.status === 302) {
            if (error && error.error && error.error.Data) {
                var UserObject = Object.assign({ Username: error.error.Data.User.Username, UserId: error.error.Data.User.UserId, FirstName: error.error.Data.User.FirstName, LastName: error.error.Data.User.LastName, ProfileImageUrl: error.error.Data.User.ProfileImageUrl, ProjectList: error.error.Data.User.ProjectList, isTokenGenerate: false, redirectUrl: error.error.Data.User.RedirectUrl });
                var userObject = Object.assign({ token: JSON.parse(error.error.Data.Access_Token)['auth_token'], role: error.error.Data.User.UserRole }, UserObject);
                localStorage.setItem('authorization', JSON.stringify(userObject));
                this.commonService.load();
            }
            if (error && error.error && error.error.Data && error.error.Data.User) {
                window.location.href = error.error.Data.User.RedirectUrl;
            }
            return rxjs_1.Observable.empty();
        }
        if (error.status == 400) {
            this.createMessage('error', error.error.ErrorMessage);
        }
        if (error.status == 500) {
            this.createMessage('error', error.error.ErrorMessage);
        }
        return rxjs_1.Observable.throw(error);
    };
    ApiInterceptor.prototype.createMessage = function (title, message) {
        var toastermessage = {
            type: title,
            message: message
        };
        this.toasterMessage.next(toastermessage);
    };
    ApiInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, common_services_1.CommonServices])
    ], ApiInterceptor);
    return ApiInterceptor;
}());
exports.ApiInterceptor = ApiInterceptor;


/***/ }),

/***/ "../../../../../src/app/common/lib/ck-editorconfig.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CkEditorConfig = /** @class */ (function () {
    function CkEditorConfig() {
    }
    CkEditorConfig.ConfigSetting = {
        "toolbar": [
            { "name": "basicstyles", "items": ["Bold", "Italic", "Underline", "RemoveFormat"] },
            { "name": "links", "items": ["Link , UnLink",] },
            { "name": "paragraph", "items": ["BulletedList", "NumberedList", "Outdent", "Indent"] },
            { "name": 'insert', "items": ['Image'] }
        ],
    };
    CkEditorConfig.DiscriptionConfig = {
        "toolbar": [
            { "name": "basicstyles", "items": ["Bold", "Italic", "RemoveFormat"] }
        ],
    };
    return CkEditorConfig;
}());
exports.CkEditorConfig = CkEditorConfig;


/***/ }),

/***/ "../../../../../src/app/common/lib/login_authguard.ts":
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
var userRoles_1 = __webpack_require__("../../../../../src/app/common/utility/userRoles.ts");
var LoginAuthGuard = /** @class */ (function () {
    function LoginAuthGuard(router) {
        this.router = router;
    }
    LoginAuthGuard.prototype.canActivate = function (route, state) {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if (userObject && !userObject['isTokenGenerate'] && state.url.indexOf('oauth/callback') == -1) {
            window.location.href = userObject['redirectUrl'];
        }
        else if (state.url == "" || state.url == "/") {
            if (userObject) {
                if (userObject['role'] == userRoles_1.UserRoles.Admin) {
                    this.router.navigate(['/admin/dashboard']);
                }
                else if (userObject['role'] == userRoles_1.UserRoles.User) {
                    this.router.navigate(['/dashboard']);
                }
            }
            else {
                this.router.navigate(['/login']);
            }
        }
        else if (state.url == "/login" && userObject) {
            if (userObject['role'] == userRoles_1.UserRoles.Admin) {
                this.router.navigate(['/admin/dashboard']);
            }
            else if (userObject['role'] == userRoles_1.UserRoles.User) {
                this.router.navigate(['/dashboard']);
            }
        }
        else if (!userObject && state.url != "/login") {
            this.router.navigate(['/login']);
        }
        else {
            return true;
        }
    };
    LoginAuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], LoginAuthGuard);
    return LoginAuthGuard;
}());
exports.LoginAuthGuard = LoginAuthGuard;


/***/ }),

/***/ "../../../../../src/app/common/lib/permission_authguard.ts":
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
var userRoles_1 = __webpack_require__("../../../../../src/app/common/utility/userRoles.ts");
var PermissionAuthGuard = /** @class */ (function () {
    function PermissionAuthGuard(router) {
        this.router = router;
    }
    PermissionAuthGuard.prototype.canActivate = function (route, state) {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        //used to prevent user access admin urls and vice-versa
        if (userObject) {
            if (userObject['role'] == userRoles_1.UserRoles.Admin && state.url.indexOf('admin') != -1) {
                return true;
            }
            else if (userObject['role'] == userRoles_1.UserRoles.User && state.url.indexOf('admin') == -1) {
                return true;
            }
            else {
                this.router.navigate(['/forbidden']);
            }
        }
        else {
            return true;
        }
    };
    PermissionAuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], PermissionAuthGuard);
    return PermissionAuthGuard;
}());
exports.PermissionAuthGuard = PermissionAuthGuard;


/***/ }),

/***/ "../../../../../src/app/common/lib/project.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Project = /** @class */ (function () {
    function Project() {
    }
    return Project;
}());
exports.Project = Project;
var Projects = /** @class */ (function () {
    function Projects() {
    }
    Projects.setSelectedProject = function (projectId) {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if (userObject) {
            userObject['selectedProjectId'] = projectId;
            Projects.selectedProjectId = projectId;
            localStorage.setItem('authorization', JSON.stringify(userObject));
        }
    };
    Projects.resetProjectList = function (projectList) {
        this.Project = projectList;
    };
    Projects.Project = new Array();
    Projects.projectStatus = [];
    return Projects;
}());
exports.Projects = Projects;
var UserProfile = /** @class */ (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
exports.UserProfile = UserProfile;


/***/ }),

/***/ "../../../../../src/app/common/lib/validations/Vaildations.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("../../../../rxjs/_esm5/Rx.js");
var Validations = /** @class */ (function () {
    function Validations() {
    }
    Validations.prototype.validatePassword = function (password) {
        if (password) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{6,20}/g;
            var inValid = regex.test(password.value);
            if (!inValid) {
                return {
                    passwordFormat: true
                };
            }
            return null;
        }
        else {
            return null;
        }
    };
    Validations.prototype.matchPassword = function (group) {
        var valid = false;
        var password = group.controls["Password"].value, confirmPassword = group.controls["ConfirmPassword"].value;
        if (password == confirmPassword) {
            return null;
        }
        else {
            return {
                match: true
            };
        }
    };
    Validations.prototype.validateEmail = function (email) {
        if (email) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
            var inValid = regex.test(email.value);
            if (!inValid) {
                return {
                    emailFormat: true
                };
            }
            return null;
        }
        else {
            return null;
        }
    };
    Validations.prototype.validateNoBlankValues = function (control) {
        return ((control.value || '').trim().length === 0) ? { blankValidation: true } : null;
    };
    Validations.prototype.validateCharactersOnly = function (control) {
        var regex = /^[a-zA-Z\s]*$/;
        var inValid = regex.test(control.value);
        if (!inValid) {
            return {
                textFormat: true
            };
        }
        return null;
    };
    Validations.prototype.selectOption = function (control) {
        if (control.value === null || control.value === "") {
            return {
                option: true
            };
        }
        return null;
    };
    Validations.prototype.multipleCheckboxRequireOne = function (fa) {
        var valid = false;
        var obj = fa.value.find(function (x) { return x.IsSelected == true; });
        if (obj) {
            null;
        }
        else {
            return {
                multipleCheckboxRequireOne: true
            };
        }
    };
    Validations.prototype.checkUserEmail = function (adminService) {
        return function (control) {
            return new rxjs_1.Observable(function (obs) {
                control
                    .valueChanges
                    .debounceTime(500)
                    .flatMap(function (value) { return adminService.isUserEmailExists(control.value); })
                    .subscribe(function (data) {
                    if (data.Data) {
                        obs.next({ isemailexist: true });
                    }
                    else {
                        obs.next(null);
                    }
                    obs.complete();
                }, function (error) {
                    obs.next({ isemailexist: true });
                    obs.complete();
                });
            });
        };
    };
    Validations.prototype.checkUserName = function (adminService) {
        return function (control) {
            return new rxjs_1.Observable(function (obs) {
                control
                    .valueChanges
                    .debounceTime(600)
                    .flatMap(function (value) { return adminService.isUserNameExists(control.value); })
                    .subscribe(function (data) {
                    if (data.Data) {
                        obs.next({ isuserExist: true });
                    }
                    else {
                        obs.next(null);
                    }
                    obs.complete();
                }, function (error) {
                    obs.next({ isuserExist: true });
                    obs.complete();
                });
            });
        };
    };
    return Validations;
}());
exports.Validations = Validations;


/***/ }),

/***/ "../../../../../src/app/common/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div> not found </div>"

/***/ }),

/***/ "../../../../../src/app/common/not-found/not-found.component.ts":
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
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent = __decorate([
        core_1.Component({
            selector: 'not-found',
            template: __webpack_require__("../../../../../src/app/common/not-found/not-found.component.html")
        })
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;


/***/ }),

/***/ "../../../../../src/app/common/services/common.services.ts":
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
var project_1 = __webpack_require__("../../../../../src/app/common/lib/project.ts");
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var CommonServices = /** @class */ (function () {
    function CommonServices(http) {
        this.http = http;
        this.userImage = new rxjs_1.BehaviorSubject('');
        this.userImage$ = this.userImage.asObservable();
        this.userProfile = new rxjs_1.BehaviorSubject({});
        this.userProfile$ = this.userProfile.asObservable();
        this.appNameSubject = new rxjs_1.Subject();
    }
    CommonServices.prototype.load = function () {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if (userObject) {
            project_1.Projects.selectedProjectId = userObject["selectedProjectId"];
            project_1.Projects.Project = new Array();
            for (var _i = 0, _a = userObject["ProjectList"]; _i < _a.length; _i++) {
                var project = _a[_i];
                project_1.Projects.Project.push(project);
            }
            project_1.UserProfile.FirstName = userObject["FirstName"];
            project_1.UserProfile.LastName = userObject["LastName"];
            project_1.UserProfile.ProfileImageUrl = userObject["ProfileImageUrl"];
            project_1.UserProfile.UserId = userObject["UserId"];
            project_1.UserProfile.Role = userObject["role"];
            this.setUserImage(project_1.UserProfile.ProfileImageUrl);
        }
    };
    CommonServices.prototype.setUserImage = function (userProfileImage) {
        this.userImage.next(userProfileImage);
    };
    CommonServices.prototype.setUserProfileHeader = function (userObject) {
        this.userProfile.next(userObject);
    };
    CommonServices.prototype.setUserProfileData = function (data) {
        return this.http.post('api/user/setuserprofiledata', data);
    };
    CommonServices.prototype.getUserProfileData = function () {
        return this.http.get('api/user/getuserprofiledata');
    };
    CommonServices.prototype.setProfileImage = function (data) {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if (userObject) {
            userObject['ProfileImageUrl'] = data;
            localStorage.setItem('authorization', JSON.stringify(userObject));
        }
    };
    CommonServices.prototype.setUserName = function (user) {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
        if (userObject) {
            userObject['FirstName'] = user.FirstName;
            userObject['LastName'] = user.LastName;
            localStorage.setItem('authorization', JSON.stringify(userObject));
        }
    };
    CommonServices.prototype.resetPassword = function (data) {
        return this.http.post('api/user/resetPassword', data);
    };
    CommonServices.prototype.setHeaderValues = function (data) {
        this.appNameSubject.next(data);
    };
    CommonServices.prototype.getHeaderValues = function () {
        return this.appNameSubject.asObservable();
    };
    CommonServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CommonServices);
    return CommonServices;
}());
exports.CommonServices = CommonServices;


/***/ }),

/***/ "../../../../../src/app/common/translate/translate.pipe.ts":
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
var translate_service_1 = __webpack_require__("../../../../../src/app/common/translate/translate.service.ts");
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(_translate) {
        this._translate = _translate;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        if (!value)
            return;
        return this._translate.instant(value);
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'translate',
        }),
        __metadata("design:paramtypes", [translate_service_1.TranslateService])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;


/***/ }),

/***/ "../../../../../src/app/common/translate/translate.service.ts":
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
//import { Http, Response } from '@angular/http';
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var TranslateService = /** @class */ (function () {
    function TranslateService(http) {
        this.http = http;
    }
    TranslateService_1 = TranslateService;
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        get: function () {
            return this._currentLang;
        },
        enumerable: true,
        configurable: true
    });
    TranslateService.prototype.use = function (lang) {
        // set current language
        this._currentLang = lang;
    };
    TranslateService.prototype.translate = function (key) {
        // private perform translation
        var translation = key;
        if (TranslateService_1._translations) {
            var subKeys = key.split('.') || [];
            var result = TranslateService_1._translations;
            for (var _i = 0, subKeys_1 = subKeys; _i < subKeys_1.length; _i++) {
                var subKey = subKeys_1[_i];
                if (result) {
                    result = result[subKey];
                    translation = result;
                }
                else {
                    translation = key;
                    break;
                }
            }
            if (translation) {
                return translation;
            }
            else {
                return key;
            }
        }
        return translation;
    };
    TranslateService.prototype.load = function () {
        // Retrieve broswer language
        var browserLang = this.getBrowserLang();
        // Set the app language
        this.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        this.serviceUrl = 'i18n/' + this._currentLang + '.json';
        //return new Promise((resolve, reject) => {
        //    this.http.get(this.serviceUrl).map(res => res.json()).catch((error: any): any => {
        //        reject(false);
        //        return Observable.throw(error.json().error || 'Server error');
        //    }).subscribe((callResult) => {
        //        TranslateService._translations = callResult;
        //        resolve(true);
        //    });
        //});
        var promise = this.http.get(this.serviceUrl)
            .do(function (res) {
            res;
        })
            .toPromise();
        promise.then(function (data) {
            TranslateService_1._translations = data;
        });
        return promise;
    };
    TranslateService.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserLang = window.navigator['languages'] ? window.navigator['languages'][0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'];
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    TranslateService.prototype.instant = function (key) {
        // call translation
        return this.translate(key);
    };
    TranslateService._translations = null;
    TranslateService = TranslateService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], TranslateService);
    return TranslateService;
    var TranslateService_1;
}());
exports.TranslateService = TranslateService;


/***/ }),

/***/ "../../../../../src/app/common/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<h1 class=\"h4\">My Profile</h1>-->\r\n<form [formGroup]=\"formData\">\r\n    <div class=\"card my-profile has-shadow\">\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xl-4 col-left\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"Email\" disabled>\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.Email' | translate}}</small>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'CustomerModule.Placeholder.EnterFirstName' | translate}}\" formControlName=\"FirstName\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.FirstName' | translate}}</small>\r\n                        <div class=\"form-text text-danger padding-h\" *ngIf=\"formData.controls['FirstName'].touched && formData.controls['FirstName'].hasError('required')\">\r\n                            <small>{{'CustomerModule.Validations.FirstNameRequired' | translate}}</small>\r\n                        </div>\r\n                        <div class=\"form-text text-danger w-100\" *ngIf=\"formData.get('FirstName').touched && !formData.get('FirstName').hasError('required') && formData.get('FirstName').hasError('blankValidation')\">{{'CoreModule.Validations.BlankValidation' | translate}}</div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\"  placeholder=\"{{'CustomerModule.Placeholder.EnterLastName' | translate}}\"  formControlName=\"LastName\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.LastName' | translate}}</small>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\"  placeholder=\"{{'CustomerModule.Placeholder.EnterPhoneNumber' | translate}}\"  formControlName=\"PhoneNumber\">\r\n                        <small class=\"text-muted\">{{'AdminModule.Label.PhoneNumber' | translate}}</small>\r\n                    </div>\r\n                    <!--<button type=\"button\" class=\"btn btn-primary mt-2\" (click)=\"saveUserProfileData()\">Update</button>-->\r\n                </div>\r\n\r\n                <div class=\"col-xl-4 col-right\"  >\r\n                    <div class=\"row\" [formGroup]=\"resetForm\">\r\n                        <div class=\"col\">\r\n                            <div class=\"form-group has-input-icon\">\r\n                                <input #inputTag type=\"password\" formControlName=\"Password\"  placeholder=\"{{'CoreModule.Placeholder.Password' | translate}}\"  class=\"form-control\">\r\n                                <i class=\"material-icons\" (click)=\"togglePassword(inputTag)\" style=\"cursor:pointer\">visibility</i>                           \r\n                                <small class=\"text-muted\">Password</small>\r\n                                <div class=\"form-text text-danger padding-h\" *ngIf=\"!resetForm.get('Password').hasError('required')&& resetForm.get('Password').touched && resetForm.get('Password').hasError('passwordFormat')\"><small>{{'CoreModule.Validations.PasswordFormat' | translate}}</small></div>\r\n                                \r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col col-reset-password\">\r\n                            <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"resetForm.invalid\" (click)=\"resetPassword()\">RESET PASSWORD</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"image-upload-container\">\r\n                        <h5 class=\"sub-title\">Profile Image</h5>\r\n                        <div class=\"form-group upload-img-box d-flex flex-row justify-content-between rounded\">\r\n                            <div class=\"picture-block border col\">\r\n                                <img src=\"{{ProPic}}\" class=\"img-fluid\" alt=\"Profile Picture\" />\r\n                            </div>\r\n                            <div class=\"action-block text-right col\">\r\n                                <!--<label>Upload/Change Image</label>-->\r\n                                <div class=\"upload-btn-holder\">\r\n                                    <div class=\"btn btn-primary btn-block\">\r\n                                        <kendo-upload accept=\".png,.jpg\" class=\"kendo-upload-file updatename\" id=\"uploadBtn\" [saveUrl]=\"uploadSaveUrl\" (success)=\"successEventHandler($event)\">\r\n                                        </kendo-upload>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/common/user-profile/user-profile.component.ts":
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
var common_services_1 = __webpack_require__("../../../../../src/app/common/services/common.services.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var Vaildations_1 = __webpack_require__("../../../../../src/app/common/lib/validations/Vaildations.ts");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(fb, commonService, _headerService, customValidation) {
        this.fb = fb;
        this.commonService = commonService;
        this._headerService = _headerService;
        this.customValidation = customValidation;
        this.ProPic = "UserImages/noimage.gif";
        this.uploadSaveUrl = "api/user/uploadimage";
        this.uploadRemoveUrl = "removeUrl";
        this.uploadRestrictions = {
            allowedExtensions: [".jpg", ".png"]
        };
        this.formData = this.fb.group({
            UserId: [''],
            FirstName: ['', forms_1.Validators.compose([forms_1.Validators.required, customValidation.validateNoBlankValues])],
            LastName: [''],
            Email: [''],
            ProfileImage: [''],
            ProfilePhoto: [''],
            PhoneNumber: ['']
        });
        this.resetForm = this.fb.group({
            UserId: [''],
            Password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), customValidation.validatePassword])],
        });
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commonService.getUserProfileData().subscribe(function (res) {
            if (res) {
                _this.formData.valueChanges.subscribe(function (res) { _this.setHeaderData(); });
                _this.formData.patchValue(res.Data);
                if ((res.Data.ProfilePhoto).indexOf('.') > 0) {
                    _this.ProPic = res.Data.ProfilePhoto;
                }
            }
        });
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (data) {
            if (data == 'update')
                _this.saveUserProfileData();
        });
        document.querySelector('.updatename div span').innerHTML = "UPLOAD OR REPLACE IMAGE";
    };
    UserProfileComponent.prototype.setHeaderData = function () {
        //create Header Data.
        var headerData = { Title: "MY PROFILE" };
        headerData['buttons'] = [{ actionType: 'update', type: "UPDATE PROFILE", disabled: this.formData.invalid }];
        //emit header data to the subheader component.
        this._headerService.emitChildChanges(headerData);
    };
    UserProfileComponent.prototype.successEventHandler = function (e) {
        if (e.operation == "upload") {
            this.formData.patchValue({ ProfilePhoto: e.response.body.Data });
            this.ProPic = e.response.body.Data;
            this.commonService.setProfileImage(e.response.body.Data);
            this.commonService.setUserImage(e.response.body.Data);
        }
    };
    UserProfileComponent.prototype.saveUserProfileData = function () {
        var _this = this;
        this.formData.value.FirstName = this.formData.value.FirstName.trim();
        this.formData.value.LastName = this.formData.value.LastName.trim();
        this.commonService.setUserProfileData(this.formData.value).subscribe(function (res) {
            if (res) {
                _this.commonService.setUserProfileHeader(_this.formData.value);
                //this.formData = res.Data;
            }
        });
    };
    UserProfileComponent.prototype.togglePassword = function (tag) {
        if (tag.type === "password")
            tag.type = "text";
        else
            tag.type = "password";
    };
    UserProfileComponent.prototype.resetPassword = function () {
        this.commonService.resetPassword(this.resetForm.value).subscribe(function (res) {
        });
    };
    UserProfileComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'user-profile',
            template: __webpack_require__("../../../../../src/app/common/user-profile/user-profile.component.html")
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, common_services_1.CommonServices, header_sevice_1.HeaderService, Vaildations_1.Validations])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;


/***/ }),

/***/ "../../../../../src/app/common/utility/dataModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataModel = /** @class */ (function () {
    function DataModel() {
    }
    return DataModel;
}());
exports.DataModel = DataModel;


/***/ }),

/***/ "../../../../../src/app/common/utility/userRoles.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "Admin";
    UserRoles["User"] = "User";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));


/***/ }),

/***/ "../../../../../src/app/core-menu/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"app-footer\">\r\n    <div class=\"quick-links\">\r\n    </div>\r\n    <span>\r\n        &#9400; {{getFullYear()}}<span class=\"spacer\">Neela</span> Corporation\r\n    </span>\r\n</footer>\r\n"

/***/ }),

/***/ "../../../../../src/app/core-menu/footer/footer.component.ts":
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
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.getFullYear = function () {
        var year = new Date();
        return year.getFullYear();
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/core-menu/footer/footer.component.html")
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;


/***/ }),

/***/ "../../../../../src/app/core-menu/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sidenav_component_1 = __webpack_require__("../../../../../src/app/core-menu/sidenav/sidenav.component.ts");
exports.SideNavComponent = sidenav_component_1.SideNavComponent;
var sidenav_service_1 = __webpack_require__("../../../../../src/app/core-menu/sidenav/sidenav.service.ts");
exports.SideNavService = sidenav_service_1.SideNavService;
var footer_component_1 = __webpack_require__("../../../../../src/app/core-menu/footer/footer.component.ts");
exports.FooterComponent = footer_component_1.FooterComponent;
var sidenav_item_component_1 = __webpack_require__("../../../../../src/app/core-menu/sidenav-toolbar/sidenav-item.component.ts");
exports.SidenavMenuItemComponent = sidenav_item_component_1.SidenavMenuItemComponent;


/***/ }),

/***/ "../../../../../src/app/core-menu/model/menu-item.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MenuItem = /** @class */ (function () {
    function MenuItem(model) {
        if (model) {
            this.name = model.name;
            this.route = model.route;
            this.subItems = this.mapSubItems(model.subItems);
            this.position = model.position;
            this.parent = model.parent;
            this.icon = model.icon;
            this.iconName = model.iconName;
        }
    }
    MenuItem.prototype.mapSubItems = function (list) {
        if (list) {
            list.forEach(function (item, index) {
                list[index] = new MenuItem(item);
            });
            return list;
        }
    };
    MenuItem.prototype.hasParent = function () {
        return !!this.parent;
    };
    MenuItem.prototype.hasSubItems = function () {
        if (this.subItems) {
            return this.subItems.length > 0;
        }
        return false;
    };
    return MenuItem;
}());
exports.MenuItem = MenuItem;


/***/ }),

/***/ "../../../../../src/app/core-menu/model/settings.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Setting = /** @class */ (function () {
    function Setting() {
    }
    Setting.routeUrl = '';
    return Setting;
}());
exports.Setting = Setting;


/***/ }),

/***/ "../../../../../src/app/core-menu/sidenav-toolbar/sidenav-item.component.html":
/***/ (function(module, exports) {

module.exports = "<a *ngIf=\"!item.hasSubItems()\" [routerLink]=\"[item.route]\" routerLinkActive=\"active-tab\">\r\n    <i [ngClass]=\"item.icon\">{{item.iconName}}</i>\r\n    <span class=\"list-title\">{{ item.name }}</span>\r\n     <!--<i class=\"ion-ios-arrow-right\"></i>-->\r\n</a>\r\n\r\n<a *ngIf=\"item.hasSubItems()\">\r\n   <i></i>\r\n    <span class=\"list-title\">{{ item.name }}</span>\r\n</a>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/core-menu/sidenav-toolbar/sidenav-item.component.ts":
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
var menu_item_model_1 = __webpack_require__("../../../../../src/app/core-menu/model/menu-item.model.ts");
var SidenavMenuItemComponent = /** @class */ (function () {
    function SidenavMenuItemComponent() {
    }
    SidenavMenuItemComponent.prototype.ngOnInit = function () {
        console.log("item = " + this.item);
    };
    SidenavMenuItemComponent.prototype.getSubItemsHeight = function () {
        return (this.getOpenSubItemsCount(this.item) * 48) + "px";
    };
    SidenavMenuItemComponent.prototype.getOpenSubItemsCount = function (item) {
        var count = 0;
        return count;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", menu_item_model_1.MenuItem)
    ], SidenavMenuItemComponent.prototype, "item", void 0);
    SidenavMenuItemComponent = __decorate([
        core_1.Component({
            selector: 'app-sidenav-menu-item',
            template: __webpack_require__("../../../../../src/app/core-menu/sidenav-toolbar/sidenav-item.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], SidenavMenuItemComponent);
    return SidenavMenuItemComponent;
}());
exports.SidenavMenuItemComponent = SidenavMenuItemComponent;


/***/ }),

/***/ "../../../../../src/app/core-menu/sidenav/sidenav.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"app-side-navbar\">\r\n    <div class=\"app-main-menu\">\r\n        <div class=\"scrollbar scroll-content\">\r\n            <perfect-scrollbar>\r\n                <ul class=\"list\">\r\n\r\n                    <li class=\"list-item\" *ngFor=\"let item of items\">\r\n                        <app-sidenav-menu-item [item]=\"item\"></app-sidenav-menu-item>\r\n                    </li>\r\n\r\n                </ul>\r\n            </perfect-scrollbar>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/core-menu/sidenav/sidenav.component.ts":
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
var sidenav_service_1 = __webpack_require__("../../../../../src/app/core-menu/sidenav/sidenav.service.ts");
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(sideNavSevice) {
        this.sideNavSevice = sideNavSevice;
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var that = this;
        this._itemSubscription = this.sideNavSevice.menuItem$.subscribe(function (res) {
            that.items = res;
        });
    };
    SideNavComponent = __decorate([
        core_1.Component({
            selector: 'app-sidenav',
            template: __webpack_require__("../../../../../src/app/core-menu/sidenav/sidenav.component.html")
        }),
        __metadata("design:paramtypes", [sidenav_service_1.SideNavService])
    ], SideNavComponent);
    return SideNavComponent;
}());
exports.SideNavComponent = SideNavComponent;


/***/ }),

/***/ "../../../../../src/app/core-menu/sidenav/sidenav.service.ts":
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
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
var menu_item_model_1 = __webpack_require__("../../../../../src/app/core-menu/model/menu-item.model.ts");
var settings_1 = __webpack_require__("../../../../../src/app/core-menu/model/settings.ts");
var dataModel_1 = __webpack_require__("../../../../../src/app/common/utility/dataModel.ts");
var SideNavService = /** @class */ (function () {
    function SideNavService(router) {
        var _this = this;
        this.router = router;
        this._menuItemSubject = new rxjs_1.BehaviorSubject([]);
        this._menuItem = [];
        this.menuItem$ = this._menuItemSubject.asObservable();
        console.log('constructor called');
        this.router.events.subscribe(function (res) {
            if (res instanceof router_1.NavigationStart) {
                _this.setSidenavMenuItem(res.url.split('/')[1]);
                console.log('navigation start');
            }
            else if (res instanceof router_1.NavigationEnd) {
                _this.setSidenavMenuItem(res.url.split('/')[1]);
                console.log('Navigation end');
            }
        });
    }
    SideNavService.prototype.ngOnInit = function () {
    };
    SideNavService.prototype.setSidenavMenuItem = function (url) {
        if (url != settings_1.Setting.routeUrl) {
            settings_1.Setting.routeUrl = url;
            switch (url) {
                case "admin":
                    this.setAdminMenu();
                    break;
                default:
                    this.setMenu();
            }
        }
        //  this.setAdminMenu();
    };
    SideNavService.prototype.setMenu = function () {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : {};
        dataModel_1.DataModel.ProjectId = userObject['selectedProjectId'];
        dataModel_1.DataModel.UserRole = userObject['role'];
        console.log('set menu function called');
        var menu = this;
        menu._menuItem = [];
        menu.addItem("Dashboard", "/dashboard", "material-icons icon-2x", 1, 'view_module');
        //menu.addItem("My Profile", "/userprofile", "material-icons icon-2x", 2, 'person');
        // menu.addItem("Create Work Item", "/project/" + userObject['selectedProjectId'] +  "/workitem/add", "ion-document icon-2x" , 2);
        menu.addItem("Work Items", "/workitemlist", "material-icons icon-2x", 2, 'view_list');
        this.setMenuItem();
    };
    SideNavService.prototype.setAdminMenu = function () {
        var userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : {};
        dataModel_1.DataModel.UserRole = userObject['role'];
        console.log('set admin menu function called');
        var adminmenu = this;
        adminmenu._menuItem = [];
        var dashboard = adminmenu.addItem("Dashboard", "/admin/dashboard", "material-icons icon-2x", 1, 'view_module');
        adminmenu.addItem("Work Items", "/admin/userworkitemlist", "material-icons icon-2x", 2, 'view_list');
        adminmenu.addItem("Admin Project Settings", "/admin/projectsettings", "material-icons icon-2x", 3, 'dns');
        //adminmenu.addItem("Invite User", "/admin/inviteuser", "material-icons icon-2x", 4 ,'group_add');
        adminmenu.addItem("Users", "/admin/userlist", "material-icons icon-2x", 4, 'group_add');
        adminmenu.addItem("Company Settings", "/admin/companysettings", "material-icons icon-2x", 5, 'settings');
        adminmenu.addItem("About Neela", "/admin/about", "material-icons icon-2x", 5, 'info');
        this.setMenuItem();
    };
    SideNavService.prototype.setMenuItem = function () {
        this._menuItemSubject.next(this._menuItem);
    };
    SideNavService.prototype.addItem = function (name, route, icon, position, iconName) {
        var item = new menu_item_model_1.MenuItem({
            name: name,
            route: route,
            subItems: [],
            position: position || 99,
            icon: icon,
            iconName: iconName
        });
        this._menuItem.push(item);
        //   this._itemsSubject.next(this._items);
        return item;
    };
    SideNavService.prototype.addSubItem = function (parent, name, route, position) {
        var item = new menu_item_model_1.MenuItem({
            name: name,
            route: route,
            parent: parent,
            subItems: [],
            position: position || 99
        });
        parent.subItems.push(item);
        return item;
    };
    SideNavService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], SideNavService);
    return SideNavService;
}());
exports.SideNavService = SideNavService;


/***/ }),

/***/ "../../../../../src/app/core/services/header.sevice.ts":
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
var Subject_1 = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var HeaderService = /** @class */ (function () {
    function HeaderService() {
        this.headerChanges = new Subject_1.Subject();
        this.headerChanges$ = this.headerChanges.asObservable();
        this.ChildChanges = new Subject_1.Subject();
        this.ChildChanges$ = this.ChildChanges.asObservable();
    }
    HeaderService.prototype.emitHeaderChanges = function (change) {
        this.headerChanges.next(change);
    };
    HeaderService.prototype.emitChildChanges = function (change) {
        this.ChildChanges.next(change);
    };
    HeaderService = __decorate([
        core_1.Injectable()
    ], HeaderService);
    return HeaderService;
}());
exports.HeaderService = HeaderService;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map