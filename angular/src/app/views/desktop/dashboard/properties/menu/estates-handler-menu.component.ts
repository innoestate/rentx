import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesCommandsService } from 'src/app/estates/commands/estates.commands.service';
import { LodgersCommandsService } from 'src/app/lodgers/commands/lodgers.commands.service';
import { OwnersCommandsService } from 'src/app/owners/commands/owners.command.service';
// import { OwnersCommands } from 'src/app/owners/commands/owners.command';

@Component({
  selector: 'estates-handler-menu',
  standalone: false,
  templateUrl: './estates-handler-menu.component.html',
  styleUrl: './estates-handler-menu.component.scss'
})
export class DesktopPropertiesMenuComponent {

  constructor(
              private estatesCommands: EstatesCommandsService,
              private ownersCommands: OwnersCommandsService,
              private lodgersCommands: LodgersCommandsService,
              private router: Router) { }

  createNewEstate() {
    this.estatesCommands.createEstate();
  }

  createNewOwner() {
    this.ownersCommands.createOwner();
  }

  createNewLodger() {
    this.lodgersCommands.createLodger();
  }

  navigate(route: string) {
    this.router.navigate(['desktop/me/dashboard/properties/', route]);
  }

}
