import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'ui-ai-prompter',
  standalone: true,
  imports: [FormsModule, UiButtonComponent],
  templateUrl: './ui-ai-prompter.component.html',
  styleUrls: ['./ui-ai-prompter.component.scss']
})
export class UiAiPrompterComponent {
  aiMessage = input<string>('');
  loading = input<boolean>(false);
  @Output() prompt = new EventEmitter<string>();

  promptText = '';

  emitPrompt() {
    if (this.promptText.trim() && !this.loading()) {
      this.prompt.emit(this.promptText.trim());
      this.promptText = '';
    }
  }
}
