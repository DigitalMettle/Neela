import { Injectable } from '@angular/core';
import { Router, NavigationStart, ActivationEnd, NavigationEnd } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { MenuItem } from '../model/menu-item.model'
import { Setting } from '../model/settings'
import { DataModel } from './../../common/utility/dataModel'

@Injectable()
export class SideNavService {
    private _menuItemSubject = new BehaviorSubject<MenuItem[]>([]);
    private _menuItem: MenuItem[] = [];
    menuItem$: Observable<MenuItem[]> = this._menuItemSubject.asObservable();


    constructor(private router: Router) {

        console.log('constructor called');

        this.router.events.subscribe((res) => {
            if (res instanceof NavigationStart) {
                this.setSidenavMenuItem(res.url.split('/')[1])
                console.log('navigation start')
            }
            else if (res instanceof NavigationEnd) {
                this.setSidenavMenuItem(res.url.split('/')[1])
                console.log('Navigation end')
            }
        })
    }

    ngOnInit() {


    }

    setSidenavMenuItem(url) {

        if (url != Setting.routeUrl) {
            Setting.routeUrl = url;
            switch (url) {
                case "admin":
                    this.setAdminMenu();
                    break;
                default:
                    this.setMenu();
            }
        }

        //  this.setAdminMenu();
    }

    setMenu() {
        let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : {};
        DataModel.ProjectId = userObject['selectedProjectId'];
        DataModel.UserRole = userObject['role'];
        console.log('set menu function called');
        let menu = this;
        menu._menuItem = [];
        menu.addItem("Dashboard", "/dashboard", "material-icons icon-2x", 1, 'view_module');
        //menu.addItem("My Profile", "/userprofile", "material-icons icon-2x", 2, 'person');
        // menu.addItem("Create Work Item", "/project/" + userObject['selectedProjectId'] +  "/workitem/add", "ion-document icon-2x" , 2);
        menu.addItem("Work Items", "/workitemlist", "material-icons icon-2x", 2, 'view_list');
        this.setMenuItem();
    }

    setAdminMenu() {
        let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : {};
        DataModel.UserRole = userObject['role'];
        console.log('set admin menu function called');
        let adminmenu = this;
        adminmenu._menuItem = [];
        let dashboard = adminmenu.addItem("Dashboard", "/admin/dashboard", "material-icons icon-2x", 1, 'view_module');
        adminmenu.addItem("Work Items", "/admin/userworkitemlist", "material-icons icon-2x", 2, 'view_list');
        adminmenu.addItem("Admin Project Settings", "/admin/projectsettings", "material-icons icon-2x", 3, 'dns');
        //adminmenu.addItem("Invite User", "/admin/inviteuser", "material-icons icon-2x", 4 ,'group_add');
        adminmenu.addItem("Users", "/admin/userlist", "material-icons icon-2x", 4, 'group_add');
        adminmenu.addItem("Company Settings", "/admin/companysettings", "material-icons icon-2x", 5, 'settings');
        adminmenu.addItem("About Neela", "/admin/about", "material-icons icon-2x", 5, 'info');


        this.setMenuItem();
    }

    setMenuItem() {
        this._menuItemSubject.next(this._menuItem);
    }

    addItem(name: string, route: string, icon: string, position: number, iconName:string): MenuItem {
        let item = new MenuItem({
            name: name,
            route: route,
            subItems: [],
            position: position || 99,
            icon: icon,
            iconName: iconName
        });
        this._menuItem.push(item);
        //   this._itemsSubject.next(this._items);
        return item;
    }

    addSubItem(parent: MenuItem, name: string, route: string, position: number) {
        let item = new MenuItem({
            name: name,
            route: route,
            parent: parent,
            subItems: [],
            position: position || 99
        });

        parent.subItems.push(item);
        return item;
    }

}
