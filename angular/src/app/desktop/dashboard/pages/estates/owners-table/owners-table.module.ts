import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersTableComponent } from './owners-table.component';
import { RouterModule } from '@angular/router';
import { UiTableComponent } from 'src/app/ui/components/ui-table/ui-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwnersEffects } from 'src/app/core/store/owner/owners.effects';
import { ownersReducer } from 'src/app/core/store/owner/owners.reducers';
import { UiNestedDropdownComponent } from 'src/app/ui/components/ui-nested-dropdown/ui-nested-dropdown.component';


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
    UiTableComponent,
    UiNestedDropdownComponent
  ]
})
export class OwnersTableModule { }
