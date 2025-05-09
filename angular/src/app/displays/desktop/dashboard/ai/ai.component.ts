import { Component, OnDestroy, signal } from '@angular/core';
import { Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { AiFacadeService } from '../../../../features/ai/facades/ai.facade';

@Component({
  selector: 'app-ai',
  standalone: false,
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent implements OnDestroy {
  aiMessage = 'Hello, I am your AI assistant. How can I help you today?';
  loading = signal(false);
  private readonly destroyed$ = new Subject<void>();

  constructor(private aiFacade: AiFacadeService) {}

  onPrompt(prompt: string) {
    this.loading.set(true);
    this.aiFacade.buildInvestorProfile(prompt).pipe(
      tap(response => {
        this.aiMessage = response.iaPrompt;
        console.log('Fields:', response.fields);
      }),
      catchError(error => {
        console.error('Error building investor profile:', error);
        this.aiMessage = 'Sorry, there was an error processing your request.';
        return of(null);
      }),
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
