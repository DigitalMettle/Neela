import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { CKEditorModule } from 'ng2-ckeditor'
import { CommonCustomModule } from './../common'
import { ChartsModule } from 'ng2-charts';
import { CustomerDashboardComponent, CustomerRouteModule, WorkItemComponent, CustomerService, WorkItemListComponent, WorkItemChildListComponent } from './index';



@NgModule({
    imports: [CommonModule,ChartsModule , FormsModule, CommonCustomModule, CKEditorModule, ReactiveFormsModule, CustomerRouteModule, GridModule],
    declarations: [CustomerDashboardComponent, WorkItemComponent, WorkItemListComponent, WorkItemChildListComponent],
    exports: [ ],
    providers: [CustomerService]
})  

export class CustomerModule {

}