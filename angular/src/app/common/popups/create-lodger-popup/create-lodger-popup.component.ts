import { Component } from '@angular/core';
import { CreateOwnerComponent } from '../../components/create-owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateLodgerComponent } from '../../components/create-lodger.component';

@Component({
  selector: 'app-create-lodger-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './create-lodger-popup.component.html',
  styleUrl: './create-lodger-popup.component.scss'
})
export class CreateLodgerPopupComponent extends CreateLodgerComponent {

}
