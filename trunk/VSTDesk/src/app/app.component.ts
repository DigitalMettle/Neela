import { Component, Inject, APP_INITIALIZER,ChangeDetectorRef } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular5-toaster';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor, TranslateService } from './common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    isLoading: boolean = false;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: true,
    timeout: 2000
  });

  constructor(private cdRef:ChangeDetectorRef, protected toasterService: ToasterService, @Inject(HTTP_INTERCEPTORS) apiInterceptor: ApiInterceptor, private translate: TranslateService) {

      let that = this;
      apiInterceptor[1].message$.subscribe(res => {
      if (res['type'] != '') {
        that.ShowToaster(res);
      }

      apiInterceptor[1].loading$.subscribe(res => {
          if(res > 0){
              that.isLoading = true;
              
          } else {
              
              that.isLoading = false;
              
              
          }
      })
    })

    let browserLang: string = translate.getBrowserLang();

    // Set the app language
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    let that = this;

  }

  // popToast() {
  //   this.toasterService.pop('error', '', 'Args Body');
  // }

  ShowToaster(res: Object) {
    let message = ''
    for (let result of res['message']) {
      if (result && result != '') {
        this.toasterService.pop(res['type'], '', result);
      }
    }

  }

  ngAfterViewChecked()
{
  this.cdRef.detectChanges();
}

  title = 'app';
}
