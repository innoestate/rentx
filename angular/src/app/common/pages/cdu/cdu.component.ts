import { Component } from '@angular/core';

@Component({
    selector: 'app-cdu',
    templateUrl: './cdu.component.html',
    styleUrl: './cdu.component.scss',
    standalone: false
})
export class CduComponent {
  lastUpdated: string = '2025-02-06';
}
