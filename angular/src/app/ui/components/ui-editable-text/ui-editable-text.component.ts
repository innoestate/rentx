import { AfterViewChecked, AfterViewInit, Component, ElementRef, input, output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';

@Component({
  selector: 'ui-editable-text',
  imports: [],
  templateUrl: './ui-editable-text.component.html',
  styleUrl: './ui-editable-text.component.scss'
})
export class UiEditableTextComponent implements AfterViewChecked {

  text = input<string>()
  onEdit = output<string>();
  change = new Subject<string>();
  maxHeight = input<number>(500);
  maxWidth = input<number>(400);

  constructor(private elRef: ElementRef) {
    this.change.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(value => {
        this.onEdit.emit(value);
      })
    ).subscribe();
  }

  ngAfterViewChecked(): void {
    this.updateHeight();
  }

  edit(event: Event) {
    this.change.next((event.target as HTMLTextAreaElement).value);
    this.updateHeight();
  }

  private updateHeight(){
    const textArea = this.elRef.nativeElement.querySelector('textarea');
    textArea.style.height = 'auto';
    textArea.style.height = (Math.max(200, Math.min(this.maxHeight(), textArea.scrollHeight))) + 'px';
  }

}
