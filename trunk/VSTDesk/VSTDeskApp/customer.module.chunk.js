webpackJsonp(["customer.module"],{

/***/ "../../../../../src/app/Customer/customer.module.ts":
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
var kendo_angular_grid_1 = __webpack_require__("../../../../@progress/kendo-angular-grid/dist/es/index.js");
var ng2_ckeditor_1 = __webpack_require__("../../../../ng2-ckeditor/lib/ng2-ckeditor.js");
var common_2 = __webpack_require__("../../../../../src/app/common/index.ts");
var ng2_charts_1 = __webpack_require__("../../../../ng2-charts/index.js");
var index_1 = __webpack_require__("../../../../../src/app/Customer/index.ts");
var CustomerModule = /** @class */ (function () {
    function CustomerModule() {
    }
    CustomerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, ng2_charts_1.ChartsModule, forms_1.FormsModule, common_2.CommonCustomModule, ng2_ckeditor_1.CKEditorModule, forms_1.ReactiveFormsModule, index_1.CustomerRouteModule, kendo_angular_grid_1.GridModule],
            declarations: [index_1.CustomerDashboardComponent, index_1.WorkItemComponent, index_1.WorkItemListComponent, index_1.WorkItemChildListComponent],
            exports: [],
            providers: [index_1.CustomerService]
        })
    ], CustomerModule);
    return CustomerModule;
}());
exports.CustomerModule = CustomerModule;


/***/ }),

/***/ "../../../../../src/app/Customer/customer.route.ts":
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
var customer_dashboard_component_1 = __webpack_require__("../../../../../src/app/Customer/dashboard/customer-dashboard.component.ts");
var addwork_item_component_1 = __webpack_require__("../../../../../src/app/Customer/work-item/addwork-item.component.ts");
var workitem_list_component_1 = __webpack_require__("../../../../../src/app/Customer/workitemlist/workitem-list.component.ts");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var routes = [
    { path: 'dashboard', component: customer_dashboard_component_1.CustomerDashboardComponent },
    { path: 'project/:projectId/workitem/add', component: addwork_item_component_1.WorkItemComponent, data: { isNew: true } },
    { path: 'project/:projectId/workitem/:workitemId/edit', component: addwork_item_component_1.WorkItemComponent, data: { isNew: false } },
    { path: 'workitemlist', component: workitem_list_component_1.WorkItemListComponent },
    { path: 'userprofile', component: common_1.UserProfileComponent }
];
var CustomerRouteModule = /** @class */ (function () {
    function CustomerRouteModule() {
    }
    CustomerRouteModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CustomerRouteModule);
    return CustomerRouteModule;
}());
exports.CustomerRouteModule = CustomerRouteModule;


/***/ }),

/***/ "../../../../../src/app/Customer/dashboard/customer-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dashborad\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 mb-4\">\r\n            <div class=\"projects-list-container\">\r\n                <div class=\"form-group\">\r\n\r\n                    <select class=\"custom-select custom-select-secondary\" id=\"inlineFormCustomSelect\" (change)=\"onSelect($event.target.value)\">\r\n                        <option *ngFor=\"let project of projectList\" value={{project.Id}}>{{project.Name}}</option>\r\n                    </select>\r\n                    <small class=\"text-muted\">{{'AdminModule.Label.ProjectsList' | translate}}</small>\r\n                    <small class=\"text-muted\" *ngIf=\"projectList?.length==0\">{{'AdminModule.Label.NoProjects' | translate}}</small>\r\n                </div>\r\n            </div>\r\n            <p>{{projectSummary}}</p>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TODAY'S STATUS</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12 chart\" *ngIf=\"barChartData?.length\">\r\n                            <canvas baseChart #baseChart1=\"base-chart\"\r\n                                    [datasets]=\"barChartData\"\r\n                                    [labels]=\"barChartLabels\"\r\n                                    [options]=\"barChartOptions\"\r\n                                    [legend]=\"barChartLegend\"\r\n                                    [chartType]=\"barChartType\"\r\n                                    (chartHover)=\"chartHovered($event)\"\r\n                                    [colors]=\"barChartColors\"\r\n                                    (chartClick)=\"chartClicked($event)\"></canvas>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TOTAL OPEN: STATUS</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\" *ngIf=\"lineChartData1?.length\">\r\n                        <canvas baseChart #baseChart2=\"base-chart\"\r\n                                [datasets]=\"lineChartData1\"\r\n                                [labels]=\"lineChartLabels\"\r\n                                [options]=\"lineChartOptions\"\r\n                                [colors]=\"lineChartColors\"\r\n                                [legend]=\"lineChartLegend\"\r\n                                [chartType]=\"lineChartType\"\r\n                                (chartHover)=\"chartHovered($event)\"\r\n                                (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card has-shadow mb-4\">\r\n                <h5 class=\"card-header\">TOTAL OPEN: TYPE</h5>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\" *ngIf=\"lineChartData2?.length\">\r\n                        <canvas baseChart #baseChart3=\"base-chart\"\r\n                                [datasets]=\"lineChartData2\"\r\n                                [labels]=\"lineChartLabels\"\r\n                                [options]=\"lineChartOptions\"\r\n                                [colors]=\"lineChartColors\"\r\n                                [legend]=\"lineChartLegend\"\r\n                                [chartType]=\"lineChartType\"\r\n                                (chartHover)=\"chartHovered($event)\"\r\n                                (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/Customer/dashboard/customer-dashboard.component.ts":
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
var customer_services_1 = __webpack_require__("../../../../../src/app/Customer/services/customer-services.ts");
var ng2_charts_1 = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
var CustomerDashboardComponent = /** @class */ (function () {
    function CustomerDashboardComponent(_customerService) {
        this._customerService = _customerService;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.barChartLabels = [''];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.lineChartLabels = ['3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'Today'];
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
        this.barChartData = [
            { data: [0, 0, 0], label: '' }
        ];
        this.lineChartData1 = [
            { data: [0, 0, 0, 0], label: '' }
        ];
        this.lineChartData2 = [
            { data: [0, 0, 0, 0], label: '' }
        ];
    }
    CustomerDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._customerService.getAssignedProjectList().subscribe(function (res) {
            if (res && res.Data.length > 0) {
                _this.projectList = res.Data;
                _this.setChartData(_this.projectList[0].Id);
            }
        });
    };
    CustomerDashboardComponent.prototype.onSelected = function (projectId) {
        this.setChartData(projectId);
    };
    CustomerDashboardComponent.prototype.onSelect = function (projectId) {
        //if (projectId != -1) {
        this.setChartData(projectId);
        //}
    };
    CustomerDashboardComponent.prototype.setChartData = function (projectId) {
        var _this = this;
        this._customerService.getChartData(projectId).subscribe(function (res) {
            if (res) {
                debugger;
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
    __decorate([
        core_1.ViewChild("baseChart1"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], CustomerDashboardComponent.prototype, "chart1", void 0);
    __decorate([
        core_1.ViewChild("baseChart2"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], CustomerDashboardComponent.prototype, "chart2", void 0);
    __decorate([
        core_1.ViewChild("baseChart3"),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], CustomerDashboardComponent.prototype, "chart3", void 0);
    CustomerDashboardComponent = __decorate([
        core_1.Component({
            selector: 'customer-dashboard',
            template: __webpack_require__("../../../../../src/app/Customer/dashboard/customer-dashboard.component.html")
        }),
        __metadata("design:paramtypes", [customer_services_1.CustomerService])
    ], CustomerDashboardComponent);
    return CustomerDashboardComponent;
}());
exports.CustomerDashboardComponent = CustomerDashboardComponent;


/***/ }),

/***/ "../../../../../src/app/Customer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var customer_dashboard_component_1 = __webpack_require__("../../../../../src/app/Customer/dashboard/customer-dashboard.component.ts");
exports.CustomerDashboardComponent = customer_dashboard_component_1.CustomerDashboardComponent;
var customer_route_1 = __webpack_require__("../../../../../src/app/Customer/customer.route.ts");
exports.CustomerRouteModule = customer_route_1.CustomerRouteModule;
var addwork_item_component_1 = __webpack_require__("../../../../../src/app/Customer/work-item/addwork-item.component.ts");
exports.WorkItemComponent = addwork_item_component_1.WorkItemComponent;
var customer_services_1 = __webpack_require__("../../../../../src/app/Customer/services/customer-services.ts");
exports.CustomerService = customer_services_1.CustomerService;
var workitem_list_component_1 = __webpack_require__("../../../../../src/app/Customer/workitemlist/workitem-list.component.ts");
exports.WorkItemListComponent = workitem_list_component_1.WorkItemListComponent;
var workitem_listchild_component_1 = __webpack_require__("../../../../../src/app/Customer/workitemlist/workitem-listchild.component.ts");
exports.WorkItemChildListComponent = workitem_listchild_component_1.WorkItemChildListComponent;


/***/ }),

/***/ "../../../../../src/app/Customer/services/customer-services.ts":
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
var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
    }
    CustomerService.prototype.createWorkItem = function (data, projectId) {
        return this.http.post('api/worktitems/createworkitem/project/' + projectId, data);
    };
    CustomerService.prototype.getWorkItem = function (projectId, workItemId) {
        return this.http.get('api/worktitems/getprojectworkitembyid/project/' + projectId + '/workitem/' + workItemId);
    };
    CustomerService.prototype.getProjectWorkItem = function (projectId) {
        return this.http.get('api/worktitems/getprojectworkitems/project/' + projectId);
    };
    CustomerService.prototype.getAllProjectWorkItemStatus = function (projectId) {
        return this.http.get('api/worktitems/getallprojectworkitemstatus/project/' + projectId);
    };
    CustomerService.prototype.getProjectStatusByProjectId = function (projectId) {
        return this.http.get('api/project/projectstatus/project/' + projectId);
    };
    CustomerService.prototype.getAssignedProjectList = function () {
        return this.http.get('api/user/getassingedprojectlist');
    };
    CustomerService.prototype.GetEditableItems = function (projectId) {
        return this.http.get('api/project/getEditableItems/project/' + projectId);
    };
    CustomerService.prototype.getGridColumnFields = function (projectId) {
        return this.http.get('api/project/getgridcolumnfields/project/' + projectId);
    };
    CustomerService.prototype.getChartData = function (data) {
        return this.http.get('api/project/getchartsdata/project/' + data);
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;


/***/ }),

/***/ "../../../../../src/app/Customer/work-item/addwork-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row work-item\">\r\n    <div class=\"col-md-offset-2 col-md-12\">\r\n        <div class=\"card has-shadow\">\r\n            <div class=\"card-body\">\r\n                <div class=\"form-container\" [formGroup]=\"workItemForm\">\r\n                    <div class=\"action mb-3 d-flex justify-content-between w-100\">\r\n                        <button type=\"button\" class=\"btn btn-primary\" routerLink=\"/workitemlist\"> <i class=\"material-icons\">arrow_back_ios</i> Return To Work Items</button>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\" *ngIf=\"!isNew\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"#{{workItemId}}\" disabled />\r\n                                <small class=\"text-muted\">ID</small>\r\n                            </div>\r\n                        </div>\r\n                        <div [ngClass]=\"{'col-md-8':!isNew,'col-md-12':isNew}\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"{{'CustomerModule.Placeholder.AddTitle' | translate}}\" formControlName=\"Title\" />\r\n                                <small class=\"text-muted\">{{'CustomerModule.Label.Title' | translate}}</small>\r\n                                <div class=\"form-text text-danger w-100\" *ngIf=\"workItemForm.get('Title').touched && workItemForm.get('Title').hasError('required')\">{{'CustomerModule.Validations.TitleRequired' | translate}}</div>\r\n                                <div class=\"form-text text-danger w-100\" *ngIf=\"workItemForm.get('Title').touched && !workItemForm.get('Title').hasError('required') && workItemForm.get('Title').hasError('blankValidation')\">{{'CoreModule.Validations.BlankValidation' | translate}}</div>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <h5 class=\"sub-title\">{{'CustomerModule.Label.Description' | translate}}</h5>\r\n                        <div class=\"textarea-holder\">\r\n                            <ckeditor [config]=\"editorConfig.ConfigSetting\" formControlName=\"Description\" [readonly]=\"!deatilsEditable\"></ckeditor>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group form-group-discussion\">\r\n                        <h5 class=\"sub-title\">{{'CustomerModule.Label.Discussion' | translate}}</h5>\r\n                        <div class=\"textarea-holder\">\r\n                            <div class=\"mb-3\">\r\n\r\n                                <ckeditor [config]=\"editorConfig.DiscriptionConfig\" formControlName=\"Comment\" [readonly]=\"!customerFeedbackEditable\"></ckeditor>\r\n                            </div>\r\n                            <div class=\"box-holder\">\r\n                                <div class=\"box\" *ngFor=\"let item of workItemForm.controls['comments'].controls\">\r\n                                    <strong>{{item.controls['Date'].value}}</strong>\r\n                                    <p class=\"mb-0\">\r\n                                        <strong>USER:</strong> {{item.controls['Name'].value}}\r\n                                    </p>\r\n                                   \r\n                                    <strong >MESSAGE</strong>\r\n                                  \r\n                                    <div  class=\"form-control white-bg mt-1\"  [innerHTML]= \"item.controls['Text'].value\"></div>\r\n                                </div>\r\n                                \r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                   \r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/Customer/work-item/addwork-item.component.ts":
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
var customer_services_1 = __webpack_require__("../../../../../src/app/Customer/services/customer-services.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var common_2 = __webpack_require__("../../../../../src/app/common/index.ts");
var WorkItemComponent = /** @class */ (function () {
    function WorkItemComponent(customerService, activatedRoute, customValidation, fb, router, _headerService) {
        this.customerService = customerService;
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
        //When form value update update the header data
        this.workItemForm.valueChanges.subscribe(function (res) {
            _this.setHeaderData();
        });
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (data) {
            if (data == 'add')
                _this.createWorkItem();
        });
        var that = this;
        var url = this.router.url;
        this.projectId = url.substr((url.lastIndexOf('/') + 1));
        this.activatedRoute.data.subscribe(function (res) {
            that.isNew = res.isNew;
            var routerData = _this.router.routerState.snapshot.url.split('/');
            if (res.isNew) {
                that.projectId = routerData[2];
            }
            else {
                that.projectId = routerData[2];
                that.workItemId = Number(routerData[4]);
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
        this.customerService.createWorkItem(this.workItemForm.value, this.projectId).subscribe(function (res) {
            if (res.Data) {
                _this.router.navigateByUrl('/workitemlist');
            }
        });
    };
    WorkItemComponent.prototype.getWorkItemDetail = function () {
        var _this = this;
        this.customerService.getWorkItem(this.projectId, this.workItemId).subscribe(function (res) {
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
        this.customerService.createWorkItem(this.workItemForm.getRawValue(), this.projectId).subscribe(function (res) {
            if (res.Data) {
                _this.router.navigateByUrl('/workitemlist');
            }
        });
    };
    WorkItemComponent.prototype.getEditableItems = function (projectId) {
        var _this = this;
        var that = this;
        this.customerService.GetEditableItems(projectId).subscribe(function (res) {
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
            selector: 'addwork-item',
            template: __webpack_require__("../../../../../src/app/Customer/work-item/addwork-item.component.html")
        }),
        __metadata("design:paramtypes", [customer_services_1.CustomerService, router_1.ActivatedRoute, common_2.Validations, forms_1.FormBuilder, router_1.Router, header_sevice_1.HeaderService])
    ], WorkItemComponent);
    return WorkItemComponent;
}());
exports.WorkItemComponent = WorkItemComponent;


/***/ }),

/***/ "../../../../../src/app/Customer/workitemlist/workitem-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card has-shadow\">\r\n    <div class=\"card-body\">\r\n        <form [formGroup]=\"searchItemForm\">\r\n\r\n            <!--<h4>{{'CustomerModule.Label.WorkItemList' | translate}}</h4>-->\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\"  *ngIf=\"projects.Project.length > 1\">\r\n                            <div class=\"form-group\">\r\n                                <select class=\"custom-select custom-select-secondary white-bg\" formControlName=\"ProjectId\">\r\n                                    <option *ngFor=\"let item of projects.Project\" [ngValue]=\"item.Id\">{{item.Name}}</option>\r\n                                </select>\r\n                                <small class=\"text-muted\">Project</small>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div [ngClass]=\"{'col-md-6': projects.Project.length > 1,'col-md-12':projects.Project.length <= 1}\">\r\n                            <div class=\"form-group\">\r\n                                <select class=\"custom-select custom-select-secondary white-bg\" formControlName=\"ProjectStatus\">\r\n                                    <option value=\"Select\">  Select State  </option>\r\n                                    <option *ngFor=\"let item of projects.projectStatus\" [ngValue]=\"item\">{{item}}</option>\r\n                                </select>\r\n                                <small class=\"text-muted\">State</small>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n\r\n                    <div class=\"search-container form-container\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search By Title\" formControlName=\"Title\" />\r\n                            <button type=\"button\" class=\"btn\"> <i class=\"material-icons\">zoom_in</i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n\r\n\r\n        <kendo-grid [data]=\"gridView\" [pageSize]=\"pageSize\" [skip]=\"skip\" [pageable]=\"true\" [selectable]=\"true\" (pageChange)=\"pageChange($event)\"\r\n                    (selectionChange)=\"selectedRowChange($event)\" [height]=\"410\">\r\n            <kendo-grid-column field=\"Field.WorkItemType\" title=\"{{'CustomerModule.Label.WorkItemType' | translate}}\" width=\"125\" *ngIf=\"showWorkItemType\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.Id\" title=\"Id\" width=\"60\" *ngIf=\"showWorkItemId\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.Title\" class=\"link\" title=\"{{'CustomerModule.Label.Title' | translate}}\" width=\"300\" *ngIf=\"showTitle\">\r\n            </kendo-grid-column>\r\n            <kendo-grid-column field=\"Field.State\" title=\"{{'CustomerModule.Label.State' | translate}}\" width=\"100\" *ngIf=\"showState\">\r\n            </kendo-grid-column>\r\n\r\n            <div *kendoGridDetailTemplate=\"let dataItem\">\r\n                <!--<div>{{dataItem.ChildList.length}}</div>-->\r\n                <workitem-listchild *ngIf=\"dataItem.ChildList.length>0\" [childList]=\"dataItem.ChildList\"></workitem-listchild>\r\n            </div>\r\n\r\n        </kendo-grid>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/Customer/workitemlist/workitem-list.component.ts":
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
var customer_services_1 = __webpack_require__("../../../../../src/app/Customer/services/customer-services.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../../../src/app/common/index.ts");
var header_sevice_1 = __webpack_require__("../../../../../src/app/core/services/header.sevice.ts");
var WorkItemListComponent = /** @class */ (function () {
    function WorkItemListComponent(customerService, router, fb, _headerService) {
        this.customerService = customerService;
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
        if (this.projects.projectStatus.length == 0) {
            this.getProjectStatus(this.projects.selectedProjectId);
        }
    }
    WorkItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set header data.
        this.setHeaderData();
        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(function (action) {
            if (action == 'add')
                _this.addNewWorkItem();
        });
        this.customerService.getAssignedProjectList().subscribe(function (res) {
            if (res) {
                _this.projects.Project = res.Data.map(function (o) { return { Id: o.Id, Name: o.Name }; });
                common_1.Projects.resetProjectList(_this.projects.Project);
            }
        });
        var that = this;
        this.loadData();
        this.getGridColumnFields();
        this.searchItemForm = this.fb.group({
            Title: [''],
            ProjectId: [''],
            ProjectStatus: ['Select']
        });
        this.searchItemForm.patchValue({ ProjectId: this.projects.selectedProjectId });
        this.searchItemForm.controls['Title'].valueChanges.debounceTime(500).subscribe(function (res) {
            _this.SearchItembyTitleAndState(res, _this.searchItemForm.controls['ProjectStatus'].value);
        });
        this.searchItemForm.controls['ProjectId'].valueChanges.debounceTime(500).subscribe(function (res) {
            _this.projects.setSelectedProject(res);
            _this.getProjectStatus(res);
            common_1.DataModel.ProjectId = res;
            _this.loadData();
            _this.getGridColumnFields();
        });
        this.searchItemForm.controls['ProjectStatus'].valueChanges.debounceTime(300).subscribe(function (res) {
            _this.SearchItembyTitleAndState(_this.searchItemForm.controls['Title'].value, res);
        });
    };
    WorkItemListComponent.prototype.getProjectStatus = function (id) {
        var that = this;
        this.customerService.getProjectStatusByProjectId(id).subscribe(function (res) {
            that.projects.projectStatus = [];
            that.projects.projectStatus.push.apply(that.projects.projectStatus, res.Data);
        });
    };
    WorkItemListComponent.prototype.loadData = function () {
        var _this = this;
        this.customerService.getProjectWorkItem(common_1.DataModel.ProjectId).subscribe(function (res) {
            if (res && res.Data.Items) {
                _this.items = res.Data.Items;
                _this.gridItem = res.Data.Items;
                _this.setGrid();
            }
        });
    };
    WorkItemListComponent.prototype.getGridColumnFields = function () {
        var _this = this;
        this.customerService.getGridColumnFields(common_1.DataModel.ProjectId).subscribe(function (res) {
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
        if (selectedItem["Field"]["Id"] > 0) {
            this.router.navigate(['project', common_1.DataModel.ProjectId, 'workitem', selectedItem["Field"]["Id"], 'edit']);
        }
    };
    WorkItemListComponent.prototype.addNewWorkItem = function () {
        this.router.navigate(['project', common_1.DataModel.ProjectId, 'workitem', 'add']);
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
            // = this.items.filter(x => x.ChildList.filter(x => x.Title.toLowerCase().indexOf(res['Title'].toLowerCase()) >-1))        
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
            // = this.items.filter(x => x.ChildList.filter(x => x.Title.toLowerCase().indexOf(res['Title'].toLowerCase()) >-1))        
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
            // = this.items.filter(x => x.ChildList.filter(x => x.Title.toLowerCase().indexOf(res['Title'].toLowerCase()) >-1))        
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
            selector: 'app-work-item-list',
            template: __webpack_require__("../../../../../src/app/Customer/workitemlist/workitem-list.component.html")
        }),
        __metadata("design:paramtypes", [customer_services_1.CustomerService, router_1.Router, forms_1.FormBuilder, header_sevice_1.HeaderService])
    ], WorkItemListComponent);
    return WorkItemListComponent;
}());
exports.WorkItemListComponent = WorkItemListComponent;


/***/ }),

/***/ "../../../../../src/app/Customer/workitemlist/workitem-listchild.component.html":
/***/ (function(module, exports) {

module.exports = "<kendo-grid [data]=\"gridData\"\r\n            [pageSize]=\"pageSize\"\r\n            [skip]=\"skip\"\r\n            [pageable]=\"true\"\r\n            [selectable]=\"true\"\r\n            (selectionChange)=\"selectedRowChange($event)\"\r\n            (pageChange)=\"pageChange($event)\"\r\n             [height]=\"150\"\r\n              >\r\n    <kendo-grid-column field=\"WorkItemType\" title=\"{{'CustomerModule.Label.WorkItemType' | translate}}\" width=\"50\" *ngIf=\"showWorkItemType\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"Id\" title=\"Id\" width=\"50\" *ngIf=\"showWorkItemId\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"Title\" class=\"link\" title=\"{{'CustomerModule.Label.Title' | translate}}\" width=\"290\" *ngIf=\"showTitle\">\r\n    </kendo-grid-column>\r\n    <kendo-grid-column field=\"State\" title=\"{{'CustomerModule.Label.State' | translate}}\" width=\"100\" *ngIf=\"showState\">\r\n    </kendo-grid-column>\r\n</kendo-grid>"

/***/ }),

/***/ "../../../../../src/app/Customer/workitemlist/workitem-listchild.component.ts":
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
var customer_services_1 = __webpack_require__("../../../../../src/app/Customer/services/customer-services.ts");
var WorkItemChildListComponent = /** @class */ (function () {
    function WorkItemChildListComponent(router, customerService) {
        this.router = router;
        this.customerService = customerService;
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
        this.customerService.getGridColumnFields(this.projects.selectedProjectId).subscribe(function (res) {
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
        var selectedItem = this.gridData.data[selectionEvent.index];
        this.router.navigateByUrl('/project/' + this.projects.selectedProjectId + '/workitem/' + selectedItem["Id"] + '/edit');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WorkItemChildListComponent.prototype, "childList", void 0);
    WorkItemChildListComponent = __decorate([
        core_1.Component({
            selector: 'workitem-listchild',
            template: __webpack_require__("../../../../../src/app/Customer/workitemlist/workitem-listchild.component.html")
        }),
        __metadata("design:paramtypes", [router_1.Router, customer_services_1.CustomerService])
    ], WorkItemChildListComponent);
    return WorkItemChildListComponent;
}());
exports.WorkItemChildListComponent = WorkItemChildListComponent;


/***/ })

});
//# sourceMappingURL=customer.module.chunk.js.map