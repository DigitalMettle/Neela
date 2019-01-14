import { Component,Input,Output, EventEmitter } from '@angular/core'
import { HeaderService } from '../services/header.sevice';

@Component({
    selector: 'subheader',
    templateUrl: 'sub-header.component.html'
})
export class NewHeaderComponent {

   @Input() headerData: any;


    constructor(private _headerService:HeaderService) {

    }

    
    performAction(type:any) {
        
        this._headerService.emitHeaderChanges(type);

    }


}

