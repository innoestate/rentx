import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UxButtonComponent } from 'src/app/ux/popup/components/ux-button/ux-button.component';
import { CreateLodgerComponent } from '../../components/create-lodger.component';

@Component({
  selector: 'app-create-lodger-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UxButtonComponent
  ],
  templateUrl: './create-lodger-popup.component.html',
  styleUrls: ['./create-lodger-popup.component.scss']
})
export class CreateLodgerPopupComponent extends CreateLodgerComponent {

}
