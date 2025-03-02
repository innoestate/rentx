import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { CreateLodgerComponent } from '../../components/create-lodger.component';

@Component({
    selector: 'app-create-lodger-popup',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiButtonComponent
    ],
    templateUrl: './create-lodger-popup.component.html',
    styleUrls: ['./create-lodger-popup.component.scss'],
    standalone: true
})
export class CreateLodgerPopupComponent extends CreateLodgerComponent {

}
