import { Injectable, Type } from "@angular/core";
import { UiActionsComponent } from "src/app/ui/components/ui-actions/ui-actions.component";
import { UiNavigationComponent } from "src/app/ui/components/ui-navigation/ui-navigation.component";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopProspectionsTableComponent } from "../components/prospections-table/desktop-prospections-table.component";
import { DesktopSellersTableComponent } from "../components/sellers-table/desktop-sellers-table.component";
import { DesktopProspectionDescriptionComponent } from "../components/description/desktop-prospection-description.component";

@Injectable({
  providedIn: 'root'
})
export class InvestScopeFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: Type<any> } = {
    'navigation': UiNavigationComponent,
    'prospections': DesktopProspectionsTableComponent,
    'prospectionDescription': DesktopProspectionDescriptionComponent,
    'sellers': DesktopSellersTableComponent,
    'actions': UiActionsComponent
  };

}
