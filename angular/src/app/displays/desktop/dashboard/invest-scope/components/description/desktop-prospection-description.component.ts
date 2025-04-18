import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';

@Component({
  selector: 'app-desktop-prospection-description',
  templateUrl: './desktop-prospection-description.component.html',
  styleUrl: './desktop-prospection-description.component.scss',
  standalone: false
})
export class DesktopProspectionDescriptionComponent extends UiDisplayerComponent {

  prospection = toSignal(this.facade.onSelectedItem());
  descriptionLabel = this.localizations.getLocalization('commons', 'description')

  constructor(private facade: InvestScopeDisplayStoreFacade,
              private prospectionsData: ProspectionsDataService,
              private localizations: LocalizationsService,
              protected override elRef: ElementRef) {
    super(elRef);
  }

  updateDescription(description: string) {
    this.prospectionsData.updateProspection(this.prospection()?.id!, { resume: description });
  }

}
