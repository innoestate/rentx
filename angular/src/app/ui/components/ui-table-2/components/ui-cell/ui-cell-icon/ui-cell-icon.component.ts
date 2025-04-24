import { Component } from '@angular/core';
import { UiCellComponent } from '../ui-cell.component';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-cell-icon',
  imports: [UiIconComponent],
  templateUrl: './ui-cell-icon.component.html',
  styleUrl: './ui-cell-icon.component.scss'
})
export class UiCellIconComponent extends UiCellComponent{

}
