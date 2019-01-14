import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Projects } from './../../common';
import { CustomerService } from '../services/customer-services';


@Component({
    selector: 'workitem-listchild',
    templateUrl: 'workitem-listchild.component.html'
})
export class WorkItemChildListComponent implements OnInit {

    @Input() public childList: any[];
    public gridData: GridDataResult;
    private data: Object[];
    items: any[];
    projects = Projects;
    showWorkItemId:any = true;
    showWorkItemType: any = true;
    showTitle:any=true;
    showState: any = true;
    public pageSize = 5;
    public skip = 0;


    constructor(private router: Router, private customerService: CustomerService) { }

    ngOnInit() {
        this.loadData();
        this.getGridColumnFields();
    }

    loadData() {
        this.gridData = {
            data: this.childList.slice(this.skip, this.skip + this.pageSize),
            total: this.childList.length
        };
    }
    getGridColumnFields() {
        this.customerService.getGridColumnFields(this.projects.selectedProjectId).subscribe(res => {
            if (res && res.Data) {

                this.showWorkItemId = res.Data.WorkItemId;
                this.showWorkItemType = res.Data.WorkItemType;
                this.showTitle = res.Data.Title;
                this.showState = res.Data.State;

            }
        })
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadData();
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.loadData();
    }

    public selectedRowChange(selectionEvent: SelectionEvent) {

        let selectedItem = this.gridData.data[selectionEvent.index];
        this.router.navigateByUrl('/project/' + this.projects.selectedProjectId+'/workitem/' + selectedItem["Id"]+'/edit');
       
    }
}
