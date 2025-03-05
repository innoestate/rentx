import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstatesUiTableAdapter } from 'src/app/estates/adapters/table/estates.table.adapter';
import { EstatesCommandsModule } from 'src/app/estates/commands/estates.commands.module';
import { EstatesDataService } from 'src/app/estates/data/esates.data.service';
import { EstatesDataModule } from 'src/app/estates/data/estates.data.module';
import { LodgersCommandsModule } from 'src/app/lodgers/commands/lodgers.commands.module';
import { LodgersDataModule } from 'src/app/lodgers/data/lodgers.data.module';
import { OwnersCommandsModule } from 'src/app/owners/commands/owners.commands.module';
import { OwnersDataModule } from 'src/app/owners/data/owners.data.module';
import { RentsDataModule } from 'src/app/rents/data/rents.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { EstatesTableComponent } from './estates-table.component';
import { RentsCommandsModule } from 'src/app/rents/commands/rents.commands.module';



@NgModule({
  declarations: [EstatesTableComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: EstatesTableComponent }]),
    CommonModule,

    RentsDataModule.forRoot(),
    EstatesDataModule.forRoot(),
    OwnersDataModule.forChild(),
    LodgersDataModule.forChild(),

    LodgersCommandsModule.forChild(),
    OwnersCommandsModule.forChild(),
    EstatesCommandsModule.forChild(),
    RentsCommandsModule.forRoot(),

    UiModule.forChild(),

  ],
  providers: [
    EstatesUiTableAdapter
  ]
})
export class EstatesTableModule {

  constructor(private estatesData: EstatesDataService) {
    console.log('estate table module constructor');
    this.estatesData.loadEstates();
  }

}
