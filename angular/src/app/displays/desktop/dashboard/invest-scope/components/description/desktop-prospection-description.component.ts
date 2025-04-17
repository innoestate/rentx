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

  // public appears(){

  //   const width = this.elRef.nativeElement.offsetWidth;
  //   const height = this.elRef.nativeElement.offsetHeight;

  //   const cardContent = this.elRef.nativeElement.querySelector('.card-content');
  //   if(cardContent){
  //     cardContent.style.transition = `opacity ${250}ms`;
  //     cardContent.style.opacity = `0`;
  //   }

  //   // this.elRef.nativeElement.style.transform = `scale(0)`;
  //   this.elRef.nativeElement.style.transition = `all ${500}ms ease-in`;
  //   this.elRef.nativeElement.style.width = `0px`;
  //   this.elRef.nativeElement.style.height = `0px`;

  //   setTimeout(() => {
  //     this.elRef.nativeElement.style.width = `${width}px`;
  //     this.elRef.nativeElement.style.height = `${height}px`;
  //   }, 0);

  //   setTimeout(() => {

  //     this.elRef.nativeElement.style.height = `auto`;

  //     if(cardContent){
  //       cardContent.style.transition = `all ${250}ms ease-in`;
  //       cardContent.style.opacity = `1`;
  //     }
  //   }, 500);
  // }

}
