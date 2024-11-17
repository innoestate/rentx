import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  selector: 'create-estate-popup',
  templateUrl: './create-estate-popup.component.html',
  styleUrl: './create-estate-popup.component.scss'
})
export class CreateDesktopEstatePopupComponent extends CreateEstateComponent {

}
