import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
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
    NzImageModule,
    RouterModule,
    LegalFooterComponent
  ]
})
export class HomeComponent {
  features = [
    {
      title: 'Gestion locative',
      description: 'Gérez efficacement vos biens immobiliers avec des outils intuitifs qui vous permettent de générer et envoyer dirrectement par mail en 1 click vos quittances de loyers. Gérez les biens, les propriétaires et les locataires sans limite de lot.',
      image: 'assets/images/visuel_biens.png',
      alt: 'Gestion des biens'
    },
    {
      title: 'Gestion prospective',
      description: 'Centralisez vos prospections immobilières, gérer les vendeurs et les status de vos recherches.',
      image: 'assets/images/visuel_prospections.png',
      alt: 'Gestion des prospections'
    },
  ];
}
