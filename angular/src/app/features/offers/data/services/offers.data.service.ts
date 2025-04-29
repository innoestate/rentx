import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { OfferDto } from "../../models/offer.dto.model";
import * as OffersActions from "../ngrx/offers.actions";
import { selectOffersErrors, selectProspectionOffers } from "../ngrx/offers.selectors";

@Injectable({
    providedIn: 'root'
})
export class OffersDataService {
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

    createOffer(offer: OfferDto): Observable<OfferDto> {
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

    getProspectionOffers(prospectionId: string): Signal<OfferDto[]> {
        return this.store.selectSignal(selectProspectionOffers(prospectionId));
    }

    getOffersErrors(): Signal<{ [key: string]: any }> {
        return this.store.selectSignal(selectOffersErrors);
    }
}
