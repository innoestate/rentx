import { Component, computed, signal, Signal } from '@angular/core';
import { DesktopSellersCommandsService } from '../commands/desktop.sellers.commands.service';
import { DesktopProspectionsCommandsService } from '../commands/desktop.prospections.commands.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { Seller_Dto } from 'src/app/features/sellers/models/seller.dto.model';
import { UiAction } from 'src/app/ui/components/ui-actions/models/ui-action.model';

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