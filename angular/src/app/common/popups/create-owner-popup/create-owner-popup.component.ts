import { Component } from '@angular/core';
import { CreateOwnerComponent } from '../../components/create-owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SignatureComponent } from '../../components/signature-pad/signature.component';
import { UxButtonComponent } from 'src/app/ux/popup/components/ux-button/ux-button.component';

@Component({
  selector: 'app-create-owner-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    UxButtonComponent,
    SignatureComponent
  ],
  templateUrl: './create-owner-popup.component.html',
  styleUrls: ['./create-owner-popup.component.scss']
})
export class CreateOwnerPopupComponent extends CreateOwnerComponent {

}
