import { Component} from '@angular/core'

@Component({
    selector : 'app-footer',
    templateUrl : 'footer.component.html'
})

export class FooterComponent{

    getFullYear() {

        var year = new Date();

       return year.getFullYear();

    }
}
