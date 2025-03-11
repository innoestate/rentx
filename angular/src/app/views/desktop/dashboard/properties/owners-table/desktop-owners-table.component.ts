import { Component } from '@angular/core';
import { OwnersTableDirective } from 'src/app/owners/components/owners.table.directive';

@Component({
  selector: 'app-desktop-owners-table',
  standalone: false,
  templateUrl: './desktop-owners-table.component.html',
  styleUrl: './desktop-owners-table.component.scss'
})
export class DesktopOwnersTableComponent extends OwnersTableDirective {

}
