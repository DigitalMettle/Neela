import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService {
    headerChanges: Subject<any> = new Subject<any>();
    headerChanges$: Observable<any> = this.headerChanges.asObservable();

    ChildChanges: Subject<any> = new Subject<any>();
    ChildChanges$: Observable<any> = this.ChildChanges.asObservable();
    
 

    emitHeaderChanges(change: any) {
        this.headerChanges.next(change);
    }
    emitChildChanges(change: any) {
        this.ChildChanges.next(change);
    }

    


}