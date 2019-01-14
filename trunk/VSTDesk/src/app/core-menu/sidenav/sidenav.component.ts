import {Component} from '@angular/core';
import { Subscription } from 'rxjs'
import { SideNavService } from './sidenav.service'
import { MenuItem } from '../model/menu-item.model'
@Component({
    selector : 'app-sidenav',
    templateUrl : 'sidenav.component.html'
})

export class SideNavComponent{
   private _itemSubscription : Subscription;
   items : MenuItem[];

   constructor(private sideNavSevice : SideNavService){
   }

   ngOnInit(){
        let that = this;
        this._itemSubscription = this.sideNavSevice.menuItem$.subscribe(res =>{
            that.items = res;
        })

   }

}
