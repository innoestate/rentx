import { Component, ElementRef } from '@angular/core';
import { OwnersTableService } from 'src/app/features/owners/services/owners.table.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';

@Component({
  selector: 'app-desktop-owners-table',
  standalone: false,
  templateUrl: './desktop-owners-table.component.html',
  styleUrl: './desktop-owners-table.component.scss'
})
export class DesktopOwnersTableComponent extends UiDisplayerComponent {

  table = this.tableService.buildTable();

  constructor(private tableService: OwnersTableService, protected override elRef: ElementRef) {
    super(elRef);
  }

  ngOnInit(): void {
    this.tableService.buildTable();
  }

  updateRow(row: UiTableRow) {
    this.tableService.updateRow(row);
  }

}
