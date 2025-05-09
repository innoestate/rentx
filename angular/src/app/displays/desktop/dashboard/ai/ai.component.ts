import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, catchError, finalize, of, take, takeUntil, tap } from 'rxjs';
import { AiFacadeService } from '../../../../features/ai/facades/ai.facade';

@Component({
  selector: 'app-ai',
  standalone: false,
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent implements OnInit, OnDestroy {
  aiMessage = '';
  loading = signal(false);
  fields = this.aiFacade.getCurrentInvestorProfile();
  protected readonly Object = Object;
  private readonly destroyed$ = new Subject<void>();

  constructor(private aiFacade: AiFacadeService) {}

  ngOnInit(): void {
    this.aiFacade.getInvestorProfile().pipe(
      takeUntil(this.destroyed$)
    ).subscribe();

    this.loading.set(true);
    this.aiFacade.buildInvestorProfile('Hello.').pipe(
      take(1),
      tap(response => this.updateAiMessage(response)),
      finalize(() => this.loading.set(false)),
    ).subscribe();
  }

  onPrompt(prompt: string) {
    this.loading.set(true);
    this.aiFacade.buildInvestorProfile(prompt).pipe(
      tap(response => this.updateAiMessage(response)),
      catchError(error => {
        console.error('Error building investor profile:', error);
        this.aiMessage = 'Sorry, there was an error processing your request.';
        return of(null);
      }),
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  updateAiMessage(response: { iaPrompt: string }) {
    if (response && response.iaPrompt) {
      this.aiMessage = response.iaPrompt;
    }
    this.aiFacade.getInvestorProfile().pipe(
      take(1)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
