import { Injectable, Type } from "@angular/core";
import { UiNavigationComponent } from "src/app/ui/components/ui-navigation/ui-navigation.component";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopProspectionsActionsComponent } from "../components/actions/desktop-prospections-actions.component";
import { DesktopProspectionsTableComponent } from "../components/prospections-table/desktop-prospections-table.component";
import { DesktopSellersTableComponent } from "../components/sellers-table/desktop-sellers-table.component";

@Injectable({
  providedIn: 'root'
})
export class InvestScopeFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: Type<any> } = {
    'navigation': UiNavigationComponent,
    'prospections': DesktopProspectionsTableComponent,
    'sellers': DesktopSellersTableComponent,
    'actions': DesktopProspectionsActionsComponent
  };

}
