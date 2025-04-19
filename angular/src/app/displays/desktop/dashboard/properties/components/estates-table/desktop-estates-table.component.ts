import { Component, ElementRef } from '@angular/core';
import { EstatesTableService } from 'src/app/features/estates/services/estates.table.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';

@Component({
  selector: 'app-desktop-estates-table',
  standalone: false,
  templateUrl: './desktop-estates-table.component.html',
  styleUrl: './desktop-estates-table.component.scss'
})
export class DesktopEstatesTableComponent extends UiDisplayerComponent {

  table = this.tableService.buildTable();

  constructor(private tableService: EstatesTableService, protected override elRef: ElementRef) {
    super(elRef);
  }

  updateRow(row: UiTableRow) {
    this.tableService.updateRow(row);
  }

}
