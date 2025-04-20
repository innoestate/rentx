import { Component } from '@angular/core';
import { UiCellComponent } from '../ui-cell.component';
import { UiIcon2Component } from 'src/app/ui/components/ui-icon/ui-icon2.component';

@Component({
  selector: 'app-ui-cell-icon',
  imports: [UiIcon2Component],
  templateUrl: './ui-cell-icon.component.html',
  styleUrl: './ui-cell-icon.component.scss'
})
export class UiCellIconComponent extends UiCellComponent{

}
