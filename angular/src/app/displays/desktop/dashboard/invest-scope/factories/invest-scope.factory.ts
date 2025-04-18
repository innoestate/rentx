import { Injectable, Type } from "@angular/core";
import { UiActionsComponent } from "src/app/ui/components/ui-actions/ui-actions.component";
import { UiNavigationComponent } from "src/app/ui/components/ui-navigation/ui-navigation.component";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopProspectionDescriptionComponent } from "../components/description/desktop-prospection-description.component";
import { DesktopProspectionsTableComponent } from "../components/prospections-table/desktop-prospections-table.component";
import { DesktopSellersTableComponent } from "../components/sellers-table/desktop-sellers-table.component";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { DesktopProspectionsCommandsService } from "../commands/desktop.prospections.commands.service";
import { DesktopSellersCommandsService } from "../commands/desktop.sellers.commands.service";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";

@Injectable({
  providedIn: 'root'
})
export class InvestScopeFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: { component: Type<any>, values?: any } } = {
    'navigation': this.getNavigationComponent() ,
    'prospections': this.getProspectionComponent(),
    'prospectionDescription': this.getProspectionDescription(),
    'sellers': this.getSellersComponent(),
    'actions': this.getActionsComponent()
  };
  private sellers = this.sellersData.getSellers();


  constructor(private localizations: LocalizationsService,
    private sellersData: SellersDataService,
    private prospectionsCommands: DesktopProspectionsCommandsService,
    private sellersCommands: DesktopSellersCommandsService) {
    super();
  }

  private getNavigationComponent() {
    const values = {
      navigators: [
        { label: this.localizations.getLocalization('prospections', 'label'), navigate: 'prospections' },
        { label: this.localizations.getLocalization('sellers', 'label'), navigate: 'sellers' },
      ]
    };
    return { component: UiNavigationComponent, values };
  }

  private getProspectionComponent() {
    return { component: DesktopProspectionsTableComponent }
  }

  private getProspectionDescription() {
    return { component: DesktopProspectionDescriptionComponent };
  }

  private getSellersComponent() {
    return { component: DesktopSellersTableComponent };
  }

  private getActionsComponent() {
    const values = {
      actions: [
        {
          label: this.localizations.getLocalization('prospections', 'addProspection'),
          icon: 'add-estate',
          command: () => this.prospectionsCommands.createNew(this.sellers())
        },
        {
          label: this.localizations.getLocalization('sellers', 'addSeller'),
          icon: 'seller',
          command: () => this.sellersCommands.createNew()
        }
      ]
    };
    return { component: UiActionsComponent, values };
  }

}
