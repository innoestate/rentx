import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
/**
 * Abstract class that will be used to manage the display of components.
 * It will provide all the necessary informations to display components.
 */

@Injectable()
export abstract class DisplayerManager {

  abstract getActions(): Observable<{ label: string, icon: string, command: () => void }[]>;

  abstract init(navigation: string ): void;
  abstract navigate(navigation: string): void;

  abstract onNavigation(): Observable<string>
  abstract onDisplayComponents(): Observable<string[]>

}
