import { Component } from '@angular/core';
import { EstatesTableDirective } from 'src/app/estates/components/estates.table.directive';

@Component({
  selector: 'app-estates-list',
  standalone: false,
  templateUrl: './estates-list.component.html',
  styleUrl: './estates-list.component.scss'
})
export class EstatesListComponent extends EstatesTableDirective {

}
