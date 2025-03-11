import { Component } from '@angular/core';

@Component({
    selector: 'app-policies',
    templateUrl: './policies.component.html',
    styleUrls: ['./policies.component.css'],
    standalone: false
})
export class PoliciesComponent {
  lastUpdated: string = 'Février 2025';  // Date de mise à jour des conditions
}
