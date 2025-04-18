import { Component, OnInit } from '@angular/core';
import { InvestScopeDisplayerAdapter } from 'src/app/features/invest-scope/adapter/invest-scope.displayer.adapter';
import { InvestScopeDisplayerDirective } from 'src/app/features/invest-scope/directives/invest-scope.displayer.directive';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';

@Component({
  selector: 'app-invest-scope',
  standalone: false,
  templateUrl: './invest-scope.component.html',
  styleUrl: './invest-scope.component.scss'
})
export class InvestScopeComponent extends InvestScopeDisplayerDirective implements OnInit {

  constructor(protected override displayManager: InvestScopeDisplayManager,
      protected override adapter: InvestScopeDisplayerAdapter,
      private prospectionsData: ProspectionsDataService,
      private sellersData: SellersDataService) {
    super(displayManager, adapter);
  }

  override ngOnInit(): void {
    this.prospectionsData.loadProspections();
    this.sellersData.loadSellers();
    super.ngOnInit();
  }

}
