import { AfterViewInit, Component, effect, ElementRef, input, signal } from '@angular/core';
import { UiCellComponent } from '../ui-cell.component';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiLabelComponent } from '../../ui-label/ui-label.component';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-ui-cell-editable-number',
  imports: [CommonModule, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-cell-editable-number.component.html',
  styleUrl: './ui-cell-editable-number.component.scss'
})
export class UiCellEditableNumberComponent extends UiCellComponent implements AfterViewInit {

  protected inputWidth = signal(60);
  protected editing = signal(false);
  protected loading = signal<boolean>(false);
  protected typing = new Subject<string>();
  protected blur = new Subject<void>();

  constructor(private el: ElementRef) {
    super();
    effect(() => {
      if (this.loading() && !this.cell()?.internal) {
        this.loading.set(false);
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const contentElement = this.el.nativeElement.querySelector('.ui-label-content') as HTMLDivElement;
      this.inputWidth.set(contentElement.offsetWidth);
    }, 0);
  }

  protected onclick() {
    if (this.editing()) {
      return;
    }
    this.editing.set(!this.editing());
    if (this.editing()) {
      setTimeout(() => {
        this.getInput()?.focus();
      }, 0);
    }
  }

  protected endEdit() {
    const editedCell = { ...this.cell(), title: { ...this.cell()?.title, label: this.getInput()?.value } };
    if (!isEqual(editedCell, this.cell())) {
      this.cell.set({ ...editedCell, internal: true });
      this.onEdit.emit(editedCell);
      this.loading.set(true);
    }
    this.editing.set(false);
  }

  private getInput() {
    return this.el.nativeElement.querySelector('input');
  }

}

