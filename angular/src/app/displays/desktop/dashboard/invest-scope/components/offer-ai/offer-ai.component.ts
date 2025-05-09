import { Component } from '@angular/core';
import { OffersHttpService } from 'src/app/features/offers/data/http/offers.http.service';
import { AiFacadeService } from 'src/app/features/ai/facades/ai.facade';
import { UiAiPrompterComponent } from 'src/app/ui/components/ui-ai-prompter/ui-ai-prompter.component';

@Component({
  selector: 'app-offer-ai',
  templateUrl: './offer-ai.component.html',
  styleUrls: ['./offer-ai.component.scss'],
  standalone: true,
  imports: [UiAiPrompterComponent]
})
export class OfferAiComponent {
  constructor(
    public offerService: OffersHttpService,
    public aiFacade: AiFacadeService
  ) {}
}
