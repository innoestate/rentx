import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  selector: 'create-estate-popup',
  templateUrl: './create-estate-popup.component.html',
  styleUrl: './create-estate-popup.component.scss'
})
export class CreateDesktopEstatePopupComponent extends CreateEstateComponent {

}
