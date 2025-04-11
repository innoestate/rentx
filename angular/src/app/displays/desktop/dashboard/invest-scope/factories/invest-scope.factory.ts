import { Injectable, Type } from "@angular/core";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopProspectionsTableComponent } from "../components/prospections-table/desktop-prospections-table.component";
import { DesktopProspectionsNavigationComponent } from "../components/navigation/desktop-prospections-navigation.component";
import { DesktopSellersTableComponent } from "../components/sellers-table/desktop-sellers-table.component";
import { DesktopProspectionsActionsComponent } from "../components/actions/desktop-prospections-actions.component";

@Injectable({
  providedIn: 'root'
})
export class InvestScopeFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: Type<any> } = {
    'navigation': DesktopProspectionsNavigationComponent,
    'prospections': DesktopProspectionsTableComponent,
    'sellers': DesktopSellersTableComponent,
    'actions': DesktopProspectionsActionsComponent
  };

}
