import { Component } from '@angular/core';
import { LodgerComponent } from 'src/app/common/components/lodger.component';

@Component({
    selector: 'estate-table-lodger-cell',
    templateUrl: './estate-table-lodger-cell.component.html',
    styleUrl: './estate-table-lodger-cell.component.scss',
    standalone: false
})
export class EstateTableLodgerCellComponent extends LodgerComponent {}
