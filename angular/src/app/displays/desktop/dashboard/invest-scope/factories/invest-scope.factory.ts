import { Injectable, Type } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { ProspectionsCommandsService } from "src/app/features/prospections/commands/prospections.commands.service";
import { SellersCommandsService } from "src/app/features/sellers/commands/table/sellers.commands.service";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { UiActionsComponent } from "src/app/ui/components/ui-actions/ui-actions.component";
import { UiNavigationComponent } from "src/app/ui/components/ui-navigation/ui-navigation.component";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopProspectionDescriptionComponent } from "../components/description/desktop-prospection-description.component";
import { DesktopProspectionsTableComponent } from "../components/prospections-table/desktop-prospections-table.component";
import { DesktopSellersTableComponent } from "../components/sellers-table/desktop-sellers-table.component";
import { InvestScopeDisplayManager } from "src/app/features/invest-scope/displayer/invest-scope.displayer.manager";

@Injectable({
  providedIn: 'root'
})
export class InvestScopeFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: { component: Type<any>, values?: any } } = {
    'navigation': this.getNavigationComponent(),
    'prospections': this.getProspectionComponent(),
    'prospectionDescription': this.getProspectionDescription(),
    'sellers': this.getSellersComponent(),
    'actions': this.getActionsComponent(),
    'backToProspectionNavigation': this.getBackToProspectionNavigationComponent()
  };
  private sellers = this.sellersData.getSellers();


  constructor(private localizations: LocalizationsService,
    private sellersData: SellersDataService,
    private prospectionsCommands: ProspectionsCommandsService,
    private displayAdapter: InvestScopeDisplayManager,
    private sellersCommands: SellersCommandsService) {
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

  private getBackToProspectionNavigationComponent() {
    const values = {
      actions: [
        {
          label: this.localizations.getLocalization('common', 'back'),
          icon: { name: 'back', size: 24 },
          command: () => this.displayAdapter.navigate('prospections')
        },
      ]
    };
    return { component: UiActionsComponent, values };
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
          icon: { name: 'add-estate', size: 24 },
          command: () => this.prospectionsCommands.createNew(this.sellers())
        },
        {
          label: this.localizations.getLocalization('sellers', 'addSeller'),
          icon: { name: 'seller', size: 24 },
          command: () => this.sellersCommands.createNew()
        }
      ]
    };
    return { component: UiActionsComponent, values };
  }

}
