import { Component, computed, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProspections, removeProspection, setProspectionFilters, updateProspection } from 'src/app/core/store/prospections/prospections.actions';
import { selectAllCities, selectFilteredProspections } from 'src/app/core/store/prospections/prospections.selectors';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateProspectionComponent } from 'src/app/common/popups/create-prospection/create-prospection.component';
import { CreateSellerPopupComponent } from 'src/app/common/popups/create-seller-popup/create-seller-popup.component';
import { Prospection } from 'src/app/core/models/prospection.model';
import { PropertyStatusTypes, PROSPECTION_STATUS, ProspectionStatus } from 'src/app/core/models/dtos/prospection.dto.model';
import { PROSPECTION_COLUMNS } from './utils/prospections.utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { selectAllSellers } from 'src/app/core/store/sellers/sellers.selectors';
import { Seller } from 'src/app/core/models/seller.model';

@Component({
  selector: 'app-prospections',
  templateUrl: './prospections.template.html',
  styleUrls: ['./prospections.component.css']
})
export class ProspectionsDesktopComponent  implements OnInit {

  pageSize: number = 8;

  prospections: Signal<Prospection[]> = this.store.selectSignal(selectFilteredProspections);
  prospectionStatuses: ProspectionStatus[] = PROSPECTION_STATUS;
  prospectionStatusesFilters = PROSPECTION_STATUS.map(status => ({text: status.shortLabel, value: status.key}));
  prospectionCityFilters = computed(() => {
    const cities = this.store.selectSignal(selectAllCities)();
    return (cities as string[]).filter(Boolean).map(city => ({text: city, value: city}))
  });
  allSellersFilters = computed(() => {
    return this.store.selectSignal(selectAllSellers)().map(seller => ({text: seller.displayName, value: seller.id}));
  });
  columns = PROSPECTION_COLUMNS;
  editId!: string | null;
  hoveredRow: any = null;
  editLink = false;

  constructor(private store: Store, private modalService: NzModalService) {
    this.store.dispatch(loadProspections());
  }

  ngOnInit() {
    this.calculatePageSize();
  }

  calculatePageSize() {
    const totalHeight = window.innerHeight - 250;
    const rowHeight = 64;
    this.pageSize = Math.floor(totalHeight / rowHeight) ;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const filters = params?.filter;
    const statusFilter = filters?.find(filter => filter.key === 'status');
    const citiesFilter = filters?.find(filter => filter.key === 'city');
    const sellersFilter = filters?.find(filter => filter.key === 'seller');
    console.log('sellers', sellersFilter);
    if (statusFilter || citiesFilter || sellersFilter) {
      this.store.dispatch(setProspectionFilters({ filters: { status: statusFilter?.value as PropertyStatusTypes[], city: citiesFilter?.value as string[], sellers: sellersFilter?.value as string[] } }));
    }
  }

  openCreatePropspectionPopup() {
    this.modalService.create({
      nzTitle: 'Create Prospection',
      nzContent: CreateProspectionComponent,
      nzFooter: null
    });
  }

  openCreateSellerPopup() {
    this.modalService.create({
      nzTitle: 'Create Seller',
      nzContent: CreateSellerPopupComponent,
      nzFooter: null
    });
  }

  remove(prospection: Prospection) {
    if (prospection.id == null) {
      return;
    }
    this.store.dispatch(removeProspection({ id: prospection.id }));
  }

  setStatus(prospection: Prospection, status: PropertyStatusTypes) {
    if (prospection.id == null) {
      return;
    }
    this.store.dispatch(updateProspection({id: prospection.id, changes: {status: status}}));
  }

  startEdit(id: string, ref: HTMLInputElement) {
    this.editId = id;
    setTimeout(() => {
      requestAnimationFrame(() => {
        ref.focus();
      })
    }, 0);
  }

  edit(prospection: Prospection, fieldName: string, ref: HTMLInputElement) {
    if (prospection.id == null) {
      return;
    }
    const editableProspection: any = { id: prospection.id };
    editableProspection[fieldName] = ref.value;
    this.store.dispatch(updateProspection({ id: prospection.id, changes: editableProspection }));
  }

  stopEdit() {
    this.editId = null;
  }

}
