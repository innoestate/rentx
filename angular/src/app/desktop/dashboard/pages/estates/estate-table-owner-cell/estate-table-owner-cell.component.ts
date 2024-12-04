import { Component } from '@angular/core';
import { OwnerComponent } from 'src/app/common/components/owner.component';

@Component({
  selector: 'estate-table-owner-cell',
  templateUrl: './estate-table-owner-cell.component.html',
  styleUrl: './estate-table-owner-cell.component.scss'
})
export class EstateTableOwnerCellComponent extends OwnerComponent {}
