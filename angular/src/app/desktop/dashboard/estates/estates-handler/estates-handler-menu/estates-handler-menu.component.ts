import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesCommandsProvider } from 'src/app/estates/commands/estates.commands.provider';
import { OwnersCommands } from 'src/app/owners/commands/owners.command';

@Component({
  selector: 'estates-handler-menu',
  standalone: false,
  templateUrl: './estates-handler-menu.component.html',
  styleUrl: './estates-handler-menu.component.scss'
})
export class DesktopEstatesHandlerMenuComponent {

  constructor(private estatesCommands: EstatesCommandsProvider, private ownersCommands: OwnersCommands, private router: Router) { }

  createNewEstate() {
    this.estatesCommands.createEstate();
  }

  createNewOwner() {
    this.ownersCommands.createOwner();
  }

  createNewLodger() {
    this.estatesCommands.createLodger();
  }

  navigate(route: string) {
    this.router.navigate(['desktop/me/dashboard/estates/handler/', route]);
  }

}
