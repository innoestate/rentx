import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UiIconMockService {

  constructor() {}

  registerIcons(iconNames: string[]) {}

  getIcon(name: string): Observable<string> {
    return of('');
  }

  getIcons(): any[] {
    return [];
  }
}