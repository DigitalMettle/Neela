import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { LoginAuthGuard, PermissionAuthGuard } from '../common'
import { LoginComponent, ForgotPassword, CoreService, TFSTokenComponent, ResetPasswordComponent, HeaderComponent, CreatePasswordComponent } from './index'

const routes: Routes = [
    { path: 'login', component: LoginComponent ,  canActivate: [LoginAuthGuard] },
    { path: 'add-password', component: CreatePasswordComponent },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'oauth/callback', component: TFSTokenComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: '', component: HeaderComponent,
        children: [
            { path: '', loadChildren: '../Customer/customer.module#CustomerModule', canActivate: [LoginAuthGuard, PermissionAuthGuard] },
            { path: 'admin', loadChildren: '../Admin/admin.module#AdminModule', canActivate: [LoginAuthGuard, PermissionAuthGuard] }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CoreRouteModule {

}
