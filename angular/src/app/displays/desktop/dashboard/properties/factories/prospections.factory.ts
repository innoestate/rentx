import { Injectable, Type } from "@angular/core";
import { UiActionsComponent } from "src/app/ui/components/ui-actions/ui-actions.component";
import { UiNavigationComponent } from "src/app/ui/components/ui-navigation/ui-navigation.component";
import { DynamicComponentFactoryService } from "src/app/ui/services/factory/dynamic-component-factory.service";
import { DesktopEstatesTableComponent } from "../components/estates-table/desktop-estates-table.component";
import { DesktopOwnersTableComponent } from "../components/owners-table/desktop-owners-table.component";
import { DesktopLodgersTableComponent } from "../components/lodgers-table/desktop-lodgers-table.component";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { EstatesCommandsService } from "src/app/features/estates/commands/estates.commands.service";
import { OwnersCommandsService } from "src/app/features/owners/commands/owners.command.service";
import { LodgersCommandsService } from "src/app/features/lodgers/commands/lodgers.commands.service";


@Injectable({
  providedIn: 'root'
})
export class PropertiesFactory extends DynamicComponentFactoryService {

  protected override componentMap: { [key: string]: { component: Type<any>, values?: any } } = {
    'navigation': this.getNavigationComponent() ,
    'estates': this.getEstateTableComponent(),
    'owners': this.getOwnersTableComponent(),
    'lodgers': this.getLodgersTableComponent(),
    'actions': this.getActionsComponent()
  };


  constructor(private localizations: LocalizationsService,
    private estatesCommands: EstatesCommandsService,
    private ownersCommands: OwnersCommandsService,
    private lodgersCommands: LodgersCommandsService,
  ) {
    super();
  }

  private getNavigationComponent() {
    const values = {
      navigators: [
        { label: this.localizations.getLocalization('estates', 'label'), navigate: 'estates' },
        { label: this.localizations.getLocalization('owners', 'label'), navigate: 'owners' },
        { label: this.localizations.getLocalization('lodgers', 'label'), navigate: 'lodgers' },
      ]
    };
    return { component: UiNavigationComponent, values };
  }

  private getEstateTableComponent() {
    return { component: DesktopEstatesTableComponent }
  }

  private getOwnersTableComponent() {
    return { component: DesktopOwnersTableComponent };
  }

  private getLodgersTableComponent() {
    return { component: DesktopLodgersTableComponent };
  }

  private getActionsComponent() {
    const values = {
      actions: [
        {
          label: this.localizations.getLocalization('estates', 'create'),
          icon: { name: 'add-estate', size: 24 },
          command: () => this.estatesCommands.createEstate()
        },
        {
          label: this.localizations.getLocalization('owners', 'create'),
          icon: { name: 'add-owner', size: 24 },
          command: () => this.ownersCommands.createOwner()
        },
        {
          label: this.localizations.getLocalization('lodgers', 'create'),
          icon: { name: 'add-lodger', size: 24 },
          command: () => this.lodgersCommands.createLodger()
        }
      ]
    };
    return { component: UiActionsComponent, values };
  }

}
