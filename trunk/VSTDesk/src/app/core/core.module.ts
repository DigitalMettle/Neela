import { NgModule } from '@angular/core'
import { CoreRouteModule } from './core.routes'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CommonCustomModule } from '../common'
import { LoginComponent, ForgotPassword, CoreService, TFSTokenComponent, ResetPasswordComponent, HeaderComponent, CreatePasswordComponent } from './index'
import { HeaderService } from './services/header.sevice';
import { NewHeaderComponent } from './sub-header/sub-header.component';

@NgModule({
    imports: [CoreRouteModule, ReactiveFormsModule, CommonModule, CommonCustomModule],
    declarations: [LoginComponent, ForgotPassword, ResetPasswordComponent, TFSTokenComponent, HeaderComponent, CreatePasswordComponent, NewHeaderComponent],
    exports: [],
    providers: [CoreService,HeaderService]
})

export class CoreModule {

}