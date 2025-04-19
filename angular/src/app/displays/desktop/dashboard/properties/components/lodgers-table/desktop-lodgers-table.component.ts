import { Component, ElementRef } from '@angular/core';
import { LodgersTableService } from 'src/app/features/lodgers/services/lodgers.table.directive';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';

@Component({
  selector: 'app-desktop-lodgers-table',
  standalone: false,
  templateUrl: './desktop-lodgers-table.component.html',
  styleUrl: './desktop-lodgers-table.component.scss'
})
export class DesktopLodgersTableComponent extends UiDisplayerComponent {

  table = this.tableService.buildTable();

  constructor(private tableService: LodgersTableService, protected override elRef: ElementRef) {
    super(elRef);
  }

  ngOnInit(): void {
    this.tableService.buildTable();
  }

  updateRow(row: UiTableRow) {
    this.tableService.updateRow(row);
  }


}
