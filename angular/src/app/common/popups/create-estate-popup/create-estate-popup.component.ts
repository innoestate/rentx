import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateEstateComponent } from 'src/app/common/components/create-estate.component';
import { UxButtonComponent } from 'src/app/ux/popup/components/ux-button/ux-button.component';
import { UxDropdownComponent } from 'src/app/ux/popup/components/ux-dropdown/ux-dropdown.component';

@Component({
    imports: [
        ReactiveFormsModule,
        NzSelectModule,
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
