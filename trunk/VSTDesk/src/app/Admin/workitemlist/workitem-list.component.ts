import { Component, OnDestroy ,OnInit} from '@angular/core'
import { GridDataResult, PageChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid'
import { SortDescriptor } from '@progress/kendo-data-query'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/debounceTime';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { DataModel, Projects } from './../../common';
import { HeaderService } from '../../core/services/header.sevice';


@Component({
    selector: 'app-work-item-list-admin',
    templateUrl: 'workitem-list.component.html'
})
export class WorkItemListComponent implements OnDestroy,OnInit {
    items: any[]
    gridItem: any[]
    childItem: any[] = [];
    public gridView: GridDataResult;
    private data: Object[];
    searchItemForm: any;
    projects = Projects;
    public pageSize = 10;
    public skip = 0;
    public showWorkItemId: any = true;
    public showWorkItemType: any = true;
    public showTitle: any = true;
    public showState: any = true;
    public subscription: any;
    public headerData: any;

    constructor(private adminService: AdminService, private router: Router, private fb: FormBuilder, private _headerService:HeaderService) {
   
        this.projects.projectStatus = [];
        this.searchItemForm = this.fb.group({
            Title: [''],
            ProjectId: [''],
            ProjectStatus: ['Select']
        })
       
        
    }

    ngOnInit() {

       
        //set header data.
        this.setHeaderData();

        //add subscription when sub-header button click. 
        this.subscription = this._headerService.headerChanges$.subscribe(data => {
                if (data == 'add')
                    this.addNewWorkItem();
        });
        
        this.adminService.getProjectList().subscribe(res => {
            if (res) {
                this.projects.Project = res.Data.map(o => { return { Id: o.Id, Name: o.Name }; });
                Projects.resetProjectList(this.projects.Project);
                if (!Projects.selectedProjectId) {
                    Projects.setSelectedProject(Projects.Project[0].Id);
                }
                DataModel.ProjectId = Projects.selectedProjectId;
                if (this.projects.projectStatus.length == 0) {
                    this.getProjectStatus(this.projects.selectedProjectId);
                }
                let that = this;
                this.loadData();
                this.getGridColumnFields();
                this.searchItemForm = this.fb.group({
                    Title: [''],
                    ProjectId: [''],
                    ProjectStatus: ['Select']
                })

                this.searchItemForm.patchValue({ ProjectId: this.projects.selectedProjectId });

                this.searchItemForm.controls['Title'].valueChanges.debounceTime(500).subscribe(res => {
                    this.SearchItembyTitleAndState(res, this.searchItemForm.controls['ProjectStatus'].value)
                })
               
                this.searchItemForm.controls['ProjectId'].valueChanges.debounceTime(500).subscribe(res => {
                    this.projects.setSelectedProject(res);
                    this.getProjectStatus(res);
                    DataModel.ProjectId = res;
                    this.loadData();
                    this.getGridColumnFields();

                })

                this.searchItemForm.controls['ProjectStatus'].valueChanges.debounceTime(300).subscribe(res => {
                    this.SearchItembyTitleAndState(this.searchItemForm.controls['Title'].value, res)
                })

            }
        });
       
    }

    getProjectStatus(id: number) {
        let that = this;
        this.adminService.getProjectStatusByProjectId(id).subscribe(res => {
            that.projects.projectStatus = [];
            that.projects.projectStatus.push.apply(that.projects.projectStatus, res.Data);
        })
    }


    loadData() {
        this.adminService.getProjectWorkItem(DataModel.ProjectId).subscribe(res => {
            if (res && res.Data.Items) {
                this.items = res.Data.Items;
                this.gridItem = res.Data.Items;
                this.setGrid();
            }
        })

    }
    getGridColumnFields() {
        this.adminService.getGridColumnFields(DataModel.ProjectId).subscribe(res => {
            if (res && res.Data) {

                this.showWorkItemId = res.Data.WorkItemId;
                this.showWorkItemType = res.Data.WorkItemType;
                this.showTitle = res.Data.Title;
                this.showState = res.Data.State;
                this.setGrid();
                
            }
        })
    }

    setGrid() {
        if (this.gridItem) {
            this.gridView = {
                data: this.gridItem.slice(this.skip, this.skip + this.pageSize),
                total: this.gridItem.length
            };

            this.gridView.data.forEach((data) => { if (data.Field.Id == 0) { data.Field.Id = '' } });
        }
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.setGrid();
    }


    public selectedRowChange(selectionEvent: SelectionEvent) {
            
        let selectedItem = selectionEvent.selectedRows[0]["dataItem"];//this.gridView.data[selectionEvent.index];
        
        if (selectedItem["Field"]["Id"] > 0) 
            this.router.navigate(['admin','project', DataModel.ProjectId, 'workitem', selectedItem["Field"]["Id"], 'edit']);
    }

    addNewWorkItem() {
        this.router.navigate(['admin','project', DataModel.ProjectId, 'workitem', 'add']);
    }

   

    SearchItembyTitleAndState(title: string, state: any) {
        let that = this;
        this.skip = 0;
        that.childItem = [];
        let parentItem: any[];
        if (title && state && state != "Select") {
            parentItem = this.items.filter(x => x.Field.Title.toLowerCase().indexOf(title.toLowerCase()) > -1);
            if (parentItem.length > 0) {
                parentItem.forEach(element => {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(x => x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1) : []
                });
            }

            this.items.forEach(ele => {
                let item = ele.ChildList.length > 0 ? ele.ChildList.filter(x => x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1) : [];
                that.childItem.push.apply(that.childItem, item);
            })

            for (let item of parentItem) {
                let subItems = item['ChildList'];
                for (let subItem of subItems) {
                    let index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }

            for (let item of that.childItem) {
                let obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                }

                parentItem.push(obj);
            }

            let searchPrentItem = parentItem;
            that.childItem = [];

            parentItem = searchPrentItem.filter(x => x.Field.State.toLowerCase().indexOf(state.toLowerCase()) > -1);
            if (parentItem.length > 0) {
                parentItem.forEach(element => {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(x => x.State.toLowerCase().indexOf(state.toLowerCase()) > -1) : []
                });
            }

            searchPrentItem.forEach(ele => {
                let item = ele.ChildList.length > 0 ? ele.ChildList.filter(x => x.State.toLowerCase().indexOf(state.toLowerCase()) > -1) : [];
                that.childItem.push.apply(that.childItem, item);
            })

            for (let item of parentItem) {
                let subItems = item['ChildList'];
                for (let subItem of subItems) {
                    let index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }

            for (let item of that.childItem) {
                let obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                }

                parentItem.push(obj);
            }



        } else if (title) {
            parentItem = this.items.filter(x => x.Field.Title.toLowerCase().indexOf(title.toLowerCase()) > -1);
            if (parentItem.length > 0) {
                parentItem.forEach(element => {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(x => x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1) : []
                });
            }

            this.items.forEach(ele => {
                let item = ele.ChildList.length > 0 ? ele.ChildList.filter(x => x.Title.toLowerCase().indexOf(title.toLowerCase()) > -1) : [];
                that.childItem.push.apply(that.childItem, item);
            })

            for (let item of parentItem) {
                let subItems = item['ChildList'];
                for (let subItem of subItems) {
                    let index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }

            for (let item of that.childItem) {
                let obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                }

                parentItem.push(obj);
            }

        } else if (state && state != "Select") {
            parentItem = this.items.filter(x => x.Field.State.toLowerCase() == state.toLowerCase());
            if (parentItem.length > 0) {
                parentItem.forEach(element => {
                    element.ChildList = element.ChildList.length > 0 ? element.ChildList.filter(x => x.State.toLowerCase() == state.toLowerCase()) : []
                });
            }

            this.items.forEach(ele => {
                let item = ele.ChildList.length > 0 ? ele.ChildList.filter(x => x.State.toLowerCase() == state.toLowerCase()) : [];
                that.childItem.push.apply(that.childItem, item);
            })

            for (let item of parentItem) {
                let subItems = item['ChildList'];
                for (let subItem of subItems) {
                    let index = that.childItem.indexOf(subItem);
                    that.childItem.splice(index, 1);
                }
            }

            for (let item of that.childItem) {
                let obj = {
                    Field: item,
                    count: 0,
                    ChildList: []
                }

                parentItem.push(obj);
            }
        } else {
            parentItem = this.items;
        }

        this.gridItem = parentItem;
        this.setGrid();

    }

    setHeaderData() {
        //create Header Data.
        this.headerData = { Title: "WORK ITEMS" }
        this.headerData['buttons'] = [{ actionType: 'add', type: "ADD WORK ITEM", disabled: false, isIcon: true, iconText:'add' }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    }
    ngOnDestroy() {
        
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');

    }

}

