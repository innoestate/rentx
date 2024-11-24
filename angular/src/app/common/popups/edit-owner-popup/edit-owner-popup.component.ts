import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EditOwnerComponent } from '../../components/edit-owner.component';

@Component({
  selector: 'edit-owner-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './edit-owner-popup.component.html',
  styleUrl: './edit-owner-popup.component.scss'
})
export class EditOwnerPopupComponent extends EditOwnerComponent {

}
