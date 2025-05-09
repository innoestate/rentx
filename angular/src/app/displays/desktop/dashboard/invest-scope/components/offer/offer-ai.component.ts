import { Component } from '@angular/core';
import { OffersHttpService } from 'src/app/features/offers/data/http/offers.http.service';

@Component({
  selector: 'app-offer-ai',
  templateUrl: './offer-ai.component.html',
  styleUrls: ['./offer-ai.component.scss'],
  standalone: true
})
export class OfferAiComponent {
  constructor(public offerService: OffersHttpService) {}
}
