import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { UiIconComponent } from '../../../../../../../ui/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-offer-icons',
  templateUrl: './offer-icons.component.html',
  styleUrls: ['./offer-icons.component.scss'],
  standalone: true,
  imports: [CommonModule, UiIconComponent]
})
export class OfferIconsComponent {
  offers = input<any[] | undefined>(undefined);
  selected = model<any>();

  onSelectOffer(offer: any): void {
    this.selected.set(offer);
  }

  getIconConfig(offer: any) {
    const isSelected = this.selected() === offer;
    return {
      name: "file",
      size: 24,
      color: isSelected ? 'var(--color-basic-100)' : 'var(--color-primary-400)'
    };
  }
}
