import { Inject, Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

declare interface Window {
    navigator: any;
}
declare var window: Window;

@Injectable()
export class TranslateService {
    public static _translations: any = null;
    serviceUrl: any;

    constructor(private http: HttpClient) {
    }

    private _currentLang: string;

    public get currentLang() {
        return this._currentLang;
    }

    public use(lang: string): void {
        // set current language
        this._currentLang =  lang;
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;
        if (TranslateService._translations) {
            let subKeys = key.split('.') || [];
            let result = TranslateService._translations;
            for (let subKey of subKeys) {
                if (result) {
                    result = result[subKey];
                    translation = result;
                }
                else {
                    translation = key;
                    break;
                }
            }
            if (translation) {
                return translation;
            }
            else {
                return key;
            }

        }
        return translation;
    }

    public load() {
        // Retrieve broswer language
        let browserLang: string = this.getBrowserLang();

        // Set the app language
        this.use(browserLang.match(/en|fr/) ? browserLang : 'en');

        this.serviceUrl = 'i18n/' + this._currentLang + '.json';
        //return new Promise((resolve, reject) => {
        //    this.http.get(this.serviceUrl).map(res => res.json()).catch((error: any): any => {
        //        reject(false);
        //        return Observable.throw(error.json().error || 'Server error');
        //    }).subscribe((callResult) => {
        //        TranslateService._translations = callResult;
        //        resolve(true);
        //    });
        //});
        let promise = this.http.get(this.serviceUrl)
            .do((res: Response) =>{
               
                 res})
            .toPromise();
        promise.then((data: any) => {
          
            TranslateService._translations = data;
        });
        return promise;
    }

    public getBrowserLang(): string {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }

        let browserLang: any = window.navigator['languages'] ? window.navigator['languages'][0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'];

        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }

        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }

        return browserLang;

    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }
}