import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UxPopupService } from 'src/app/ux/popup/services/popup.service';
import { EstatesDataModule } from '../data/estates.data.module';
import { EstatesBusiness } from './estates.business';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EstatesDataModule,
  ],
  providers: [
    EstatesBusiness,
    UxPopupService
  ]
})
export class EstatesBusinessModuleModule { }
