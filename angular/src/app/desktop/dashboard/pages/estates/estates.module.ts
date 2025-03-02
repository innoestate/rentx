import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RentService } from 'src/app/common/services/rents.service';
import { DevPopupService } from 'src/app/ui/popup/services/dev.popup.service';
import { UiPopupService } from 'src/app/ui/popup/services/popup.service';
import { UiModule } from 'src/app/ui/ui.module';
import { environment } from 'src/environments/environment';
import { EstatesPageDesktopComponent } from './estates.component';
import { EstatesDesktopRoutingModule } from './estates.routing';

@NgModule({
  declarations: [
    EstatesPageDesktopComponent
  ],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule,
    UiModule,
  ],
  providers: [
    RentService,
    { provide: UiPopupService, useClass: environment.production ? UiPopupService : DevPopupService }
  ]
})
export class EstatesModule { }
