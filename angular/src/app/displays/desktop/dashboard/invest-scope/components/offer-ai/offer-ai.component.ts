import { Component, signal } from '@angular/core';
import { OffersHttpService } from 'src/app/features/offers/data/http/offers.http.service';
import { AiFacadeService } from 'src/app/features/ai/facades/ai.facade';
import { UiAiPrompterComponent } from 'src/app/ui/components/ui-ai-prompter/ui-ai-prompter.component';
import { tap } from 'rxjs/operators';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-offer-ai',
  templateUrl: './offer-ai.component.html',
  styleUrls: ['./offer-ai.component.scss'],
  standalone: true,
  imports: [UiAiPrompterComponent]
})
export class OfferAiComponent {
  aiMessage = signal<string>('');
  prospection = toSignal(this.investStoreFacade.onSelectedItem(), { initialValue: null });

  constructor(
    public offerService: OffersHttpService,
    public aiFacade: AiFacadeService,
    public investStoreFacade: InvestScopeDisplayStoreFacade
  ) {}

  emitPrompt(prompt: string) {
    const propsection_id = this.prospection()?.id;
    if (!propsection_id) return;
    this.aiFacade.buildOffer(propsection_id, prompt)
      .pipe(
        tap(response => {
          console.log(response);
          this.aiMessage.set('offre générée');
        })
      )
      .subscribe();
  }
}
