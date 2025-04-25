import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'legal-footer',
  standalone: true,
  imports: [RouterLink, NzButtonModule, NzDividerModule],
  templateUrl: './legal-footer.component.html',
  styleUrls: ['./legal-footer.component.scss']
})
export class LegalFooterComponent {
  actualYear = new Date().getFullYear();
}
