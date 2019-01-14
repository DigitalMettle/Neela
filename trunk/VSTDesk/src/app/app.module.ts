import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToasterModule } from 'angular5-toaster' //src/toaster.module';
import {  ToasterService } from 'angular5-toaster';
import { CKEditorModule } from 'ng2-ckeditor';
import { LoadingModule } from 'ngx-loading';

import { AppRoutes } from './app.routes';
import { CommonCustomModule, ApiInterceptor, TranslateService, Validations , CommonServices } from './common'
import { AppComponent } from './app.component';
import { AdminService } from './Admin/services/admin.service';

export function translateData(config: TranslateService): any {
    return () => config.load();
}

export function loadProject(config: CommonServices): any {
    return () => config.load();
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        ToasterModule,
        CKEditorModule,
        CommonCustomModule,
        AppRoutes,
        BrowserAnimationsModule,
        PerfectScrollbarModule,
        LoadingModule
        
        
    ],
    declarations: [
        AppComponent

    ],
    providers: [
        TranslateService,
        CommonServices,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER, useFactory: translateData, deps: [TranslateService], multi: true
        },
         {
            provide: APP_INITIALIZER, useFactory: loadProject, deps: [CommonServices], multi: true
        },
        Validations,
        AdminService
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
