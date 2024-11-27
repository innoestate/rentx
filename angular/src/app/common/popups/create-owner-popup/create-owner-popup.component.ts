import { Component } from '@angular/core';
import { CreateOwnerComponent } from '../../components/create-owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SignatureComponent } from '../../components/signature-pad/signature.component';

@Component({
  selector: 'app-create-owner-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    SignatureComponent
  ],
  templateUrl: './create-owner-popup.component.html',
  styleUrl: './create-owner-popup.component.scss'
})
export class CreateOwnerPopupComponent extends CreateOwnerComponent {

}
