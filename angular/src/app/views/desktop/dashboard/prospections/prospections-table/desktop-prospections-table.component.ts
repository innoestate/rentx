import { Component } from '@angular/core';
import { ProspectionTableDirective } from 'src/app/prospections/components/prospection-table.directive';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends ProspectionTableDirective {

}
