import { Component } from '@angular/core';
import { MenuComponent } from 'src/app/displays/common/components/menu.component';

@Component({
    selector: 'mobile-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    standalone: false
})
export class MenuMobileComponent extends MenuComponent{

}
