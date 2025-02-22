import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UxButtonComponent } from 'src/app/ux/components/ux-button/ux-button.component';
import { CreateLodgerComponent } from '../../components/create-lodger.component';

@Component({
    selector: 'app-create-lodger-popup',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UxButtonComponent
    ],
    templateUrl: './create-lodger-popup.component.html',
    styleUrls: ['./create-lodger-popup.component.scss'],
    standalone: true
})
export class CreateLodgerPopupComponent extends CreateLodgerComponent {

}
