import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { OfferDto } from "../models/offer.dto.model";
import * as OffersActions from "../data/ngrx/offers.data.actions";
import { selectOffers, selectOffersErrors, selectProspectionOffers } from "../data/ngrx/offers.data.selectors";
import { Prospection } from "src/app/features/prospections/models/prospection.model";
import { Owner } from "src/app/features/owners/models/owner.model";
import { downloadOffer, downloadOfferError, downloadOfferSuccess } from "../pdf/ngrx/offers.pdf.actions";

@Injectable({
  providedIn: 'root'
})
export class OffersFacadeService {
  constructor(
    private dataNgrxService: DataNgrxService,
    private store: Store
  ) { }

  loadProspectionOffers(prospection_id: string): Observable<OfferDto[]> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      OffersActions.loadProspectionOffers,
      OffersActions.loadProspectionOffersSuccess,
      OffersActions.loadProspectionOffersError,
      { prospection_id }
    );
  }

  createOffer(offer: { prospection_id: string, markdown?: string }): Observable<OfferDto> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      OffersActions.createOffer,
      OffersActions.createOfferSuccess,
      OffersActions.createOfferError,
      { offer }
    );
  }

  updateOffer(id: string, offer: Partial<OfferDto>): Observable<OfferDto> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      OffersActions.updateOffer,
      OffersActions.updateOfferSuccess,
      OffersActions.updateOfferError,
      { offer: { ...offer, id } }
    );
  }

  deleteOffer(id: string, prospection_id: string): Observable<void> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      OffersActions.deleteOffer,
      OffersActions.deleteOfferSuccess,
      OffersActions.deleteOfferError,
      { id, prospection_id }
    );
  }

  getOffers(): Signal<{ [prospectionId: string]: OfferDto[] }> {
    return this.store.selectSignal(selectOffers);
  }

  getProspectionOffers(prospectionId: string): Signal<OfferDto[]> {
    return this.store.selectSignal(selectProspectionOffers(prospectionId));
  }

  getOffersErrors(): Signal<{ [key: string]: any }> {
    return this.store.selectSignal(selectOffersErrors);
  }

  downloadOffer(owner: Owner, prospection: Prospection, content: string): Observable<void> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      downloadOffer,
      downloadOfferSuccess,
      downloadOfferError,
      { owner, prospection, content }
    );
  }

  sendOfferByEmail(prospectionId: string, pdfData: ArrayBuffer, emailBody: string): Observable<void> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      OffersActions.sendOfferByEmail,
      OffersActions.sendOfferByEmailSuccess,
      OffersActions.sendOfferByEmailError,
      { prospectionId, pdfData, emailBody }
    );
  }
}
