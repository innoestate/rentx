import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiComponent } from './ai.component';
import { AiRoutingModule } from './ai.routing';
import { UiAiPrompterComponent } from '../../../../ui/components/ui-ai-prompter/ui-ai-prompter.component';

@NgModule({
  declarations: [
    AiComponent
  ],
  imports: [
    CommonModule,
    AiRoutingModule,
    UiAiPrompterComponent
  ]
})
export class AiModule { }
