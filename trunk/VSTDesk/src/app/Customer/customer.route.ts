import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard.component';
import { WorkItemComponent } from './work-item/addwork-item.component';
import { WorkItemListComponent } from './workitemlist/workitem-list.component';
import { UserProfileComponent } from './../common';
const routes: Routes = [
    { path: 'dashboard', component: CustomerDashboardComponent },
    { path: 'project/:projectId/workitem/add', component: WorkItemComponent, data: { isNew: true } },
    { path: 'project/:projectId/workitem/:workitemId/edit', component: WorkItemComponent, data: { isNew: false } },
    { path: 'workitemlist', component: WorkItemListComponent },
    { path: 'userprofile', component: UserProfileComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CustomerRouteModule {

}