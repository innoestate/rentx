import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';
import { UxButtonComponent } from 'src/app/ux/components/ux-button/ux-button.component';
import { UxDropdownComponent } from 'src/app/ux/components/ux-dropdown/ux-dropdown.component';

@Component({
    imports: [
        ReactiveFormsModule,
        UxButtonComponent,
        UxDropdownComponent
    ],
    selector: 'create-estate-popup',
    templateUrl: './create-estate-popup.component.html',
    styleUrl: './create-estate-popup.component.scss',
    standalone: true
})
export class CreateDesktopEstatePopupComponent extends CreateEstateComponent {

  ownersDropdown = computed(() => {

    return this.owners().map(owner => ({ label: owner.name, target: owner.id}));

  });

}
