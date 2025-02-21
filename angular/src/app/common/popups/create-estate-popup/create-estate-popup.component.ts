import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';
import { UxButtonComponent } from 'src/app/ux/popup/components/ux-button/ux-button.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    UxButtonComponent
  ],
  selector: 'create-estate-popup',
  templateUrl: './create-estate-popup.component.html',
  styleUrl: './create-estate-popup.component.scss'
})
export class CreateDesktopEstatePopupComponent extends CreateEstateComponent {

}
