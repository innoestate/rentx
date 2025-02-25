import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersTableComponent } from './owners-table.component';
import { RouterModule } from '@angular/router';
import { UxTableComponent } from 'src/app/ux/components/ux-table/ux-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwnersEffects } from 'src/app/core/store/owner/owners.effects';
import { ownersReducer } from 'src/app/core/store/owner/owners.reducers';
import { UxNestedDropdownComponent } from 'src/app/ux/components/ux-nested-dropdown/ux-nested-dropdown.component';


@NgModule({
  declarations: [
    OwnersTableComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    RouterModule.forChild([
      { path: '', component: OwnersTableComponent }
    ]),
    UxTableComponent,
    UxNestedDropdownComponent
  ]
})
export class OwnersTableModule { }
