import {NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  , FormsModule} from '@angular/forms';
import { AdminRouteModule } from './admin.routes'
import { CommonCustomModule } from '../common'
import { UploadModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from 'ng2-charts';
import { GridModule } from '@progress/kendo-angular-grid';
import { CKEditorModule } from 'ng2-ckeditor'


import { DashboardComponent, AdminListComponent, WorkItemComponent, ProjectSettingsComponent, AdminService, InviteUserComponent, UserListComponent, UserDetailsComponent, CompanySettingsComponent, WorkItemListComponent, WorkItemChildListComponent, AboutNeelaComponent } from './index';

@NgModule({
    imports: [AdminRouteModule, CKEditorModule, CommonCustomModule, CommonModule, ReactiveFormsModule, FormsModule, UploadModule, ChartsModule, GridModule],
    declarations: [DashboardComponent, AdminListComponent, ProjectSettingsComponent, InviteUserComponent, UserListComponent, UserDetailsComponent, CompanySettingsComponent, WorkItemListComponent, WorkItemChildListComponent, WorkItemComponent, AboutNeelaComponent],
    exports: [],
    providers : [AdminService]
})
        
export class AdminModule {

}