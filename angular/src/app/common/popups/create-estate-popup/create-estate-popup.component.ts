import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';

@Component({
    imports: [
        ReactiveFormsModule,
        UiButtonComponent,
        UiDropdownComponent
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
