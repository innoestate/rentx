import { Component, computed } from '@angular/core';
import { DesktopProspectionsCommandsService } from 'src/app/displays/desktop/dashboard/invest-scope/commands/desktop.prospections.commands.service';
import { DesktopSellersCommandsService } from 'src/app/displays/desktop/dashboard/invest-scope/commands/desktop.sellers.commands.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';

@Component({
  selector: 'desktop-prospections-actions',
  standalone: false,
  templateUrl: './desktop-prospections-actions.component.html',
  styleUrl: './desktop-prospections-actions.component.scss'
})
export class DesktopProspectionsActionsComponent {

  actions = this.createActions();

  constructor(private SellersData: SellersDataService,
    private sellersCommands: DesktopSellersCommandsService,
    private prospectionsCommands: DesktopProspectionsCommandsService) { }


  createActions() {
    const sellers = this.SellersData.getSellers();
    return computed(() => {
      return [
        {
          icon: 'add-estate',
          command: () => this.prospectionsCommands.createNew(sellers())
        },
        {
          icon: 'seller',
          command: () => this.sellersCommands.createNew()
        }
      ];
    })
  }

}