import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LegalFooterComponent } from '../../common/components/legal-footer/legal-footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzTypographyModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    RouterModule,
    LegalFooterComponent
  ]
})
export class HomeComponent {
  features = [
    {
      icon: 'home',
      title: 'Gestion Immobilière',
      description: 'Gérez efficacement vos biens immobiliers avec des outils intuitifs'
    },
    {
      icon: 'search',
      title: 'Prospection Intelligente',
      description: 'Identifiez les meilleures opportunités grâce à nos outils de prospection avancés'
    },
    {
      icon: 'bar-chart',
      title: 'Analyses Détaillées',
      description: 'Suivez vos performances et prenez des décisions éclairées'
    }
  ];
}
