export class MenuItem {
    name: string;
    route: string;
    subItems: MenuItem[];
    position: number;
    parent: MenuItem;
    icon: string;
    iconName: string;
    constructor(model: any) {
        if (model) {
            this.name = model.name;
            this.route = model.route;
            this.subItems = this.mapSubItems(model.subItems);
            this.position = model.position;
            this.parent = model.parent;
            this.icon = model.icon;
            this.iconName = model.iconName;
        }
    }
    

    mapSubItems(list: MenuItem[]) {
        if (list) {
            list.forEach((item: MenuItem, index: number) => {
                list[index] = new MenuItem(item);
            });

            return list;
        }
    }

     hasParent() {
    return !!this.parent;
  }

    hasSubItems() {
        if (this.subItems) {
            return this.subItems.length > 0;
        }
        return false;
    }

    
}