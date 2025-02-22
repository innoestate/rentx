import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RentService } from 'src/app/common/services/rents.service';
import { DevPopupService } from 'src/app/ux/popup/services/dev.popup.service';
import { PopupService } from 'src/app/ux/popup/services/popup.service';
import { UxModule } from 'src/app/ux/ux.module';
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
    UxModule,
  ],
  providers: [
    RentService,
    { provide: PopupService, useClass: environment.production ? PopupService : DevPopupService }
  ]
})
export class EstatesModule { }
