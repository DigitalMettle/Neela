import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent, ForbiddenComponent, LoginAuthGuard, PermissionAuthGuard } from './common'
import { LoginComponent } from './core'

const routes: Routes = [
    { path: 'not-found', component: NotFoundComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '', loadChildren: './core/core.module#CoreModule'},
    // { path: '**', redirectTo: 'not-found' },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }
