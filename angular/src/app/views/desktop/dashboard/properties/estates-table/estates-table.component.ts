import { Component } from '@angular/core';
import { EstatesTableDirective } from 'src/app/estates/components/estates.table.directive';

@Component({
  standalone: false,
  templateUrl: './estates-table.component.html',
  styleUrl: './estates-table.component.scss'
})
export class EstatesTableComponent extends EstatesTableDirective {

}
