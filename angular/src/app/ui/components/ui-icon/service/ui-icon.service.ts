import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface IconDefinition {
  name: string;
  svg: string;
}

@Injectable()
export class UiIconService {
  private icons: Map<string, string> = new Map();
  private iconCache: Map<string, Observable<string>> = new Map();

  constructor(private http: HttpClient) {
    this.registerIcons(['gear',
      'add-estate',
      'add-estate',
      'add',
      'back',
      'ban',
      'calendar-check',
      'calendar',
      'check',
      'close',
      'contact',
      'down',
      'eye',
      'key',
      'left',
      'lock',
      'pen',
      'question',
      'right',
      'seller',
      'sign',
      'trophy',
      'wait',
      'trash',
      'seller']).subscribe();
  }

  registerIcons(iconNames: string[]) {
    const loadRequests = iconNames.map(name => this.loadIcon(name));
    return forkJoin(loadRequests);
  }

  getIcon(name: string): Observable<string> {
    if (!this.iconCache.has(name)) {
      this.iconCache.set(name, this.loadIcon(name).pipe(
        shareReplay(1)
      ));
    }
    return this.iconCache.get(name)!;
  }

  private loadIcon(name: string): Observable<string> {
    const path = `/assets/icons/${name}.svg`;
    return this.http.get(path, { responseType: 'text' }).pipe(
      map(svg => {
        this.icons.set(name, svg);
        return svg;
      })
    );
  }

  getIcons(): IconDefinition[] {
    return Array.from(this.icons.entries()).map(([name, svg]) => ({
      name,
      svg
    }));
  }
}