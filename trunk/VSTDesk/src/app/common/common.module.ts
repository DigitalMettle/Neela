import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UploadModule } from '@progress/kendo-angular-upload';
import { NotFoundComponent } from './not-found/not-found.component'
import { ForbiddenComponent } from './forbidden/forbidden.component'
import { LoginAuthGuard } from './lib/login_authguard'
import { PermissionAuthGuard } from './lib/permission_authguard'
import { TranslatePipe } from './translate/translate.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SideNavComponent, SideNavService, FooterComponent, SidenavMenuItemComponent } from '../core-menu'


@NgModule({
    imports: [CommonModule,ReactiveFormsModule , RouterModule, PerfectScrollbarModule , UploadModule],
    declarations: [
        NotFoundComponent,
        ForbiddenComponent,
        SideNavComponent,
        FooterComponent,
        SidenavMenuItemComponent,
        TranslatePipe,
        UserProfileComponent
    ],
    exports: [
        NotFoundComponent,
        ForbiddenComponent,
        SideNavComponent,
        FooterComponent,
        SidenavMenuItemComponent,
        TranslatePipe,
        PerfectScrollbarModule,
        UserProfileComponent
    ],
    providers: [
        LoginAuthGuard,
        SideNavService,
        PermissionAuthGuard
    ]
})

export class CommonCustomModule {

}