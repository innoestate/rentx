import { Component } from '@angular/core';
import { LodgersTableDirective } from 'src/app/lodgers/components/lodgers.table.directive';

@Component({
  selector: 'app-lodgers-table',
  standalone: false,
  templateUrl: './lodgers-table.component.html',
  styleUrl: './lodgers-table.component.scss'
})
export class DesktopLodgersTableComponent extends LodgersTableDirective{

}
