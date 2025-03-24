import { Injectable } from "@angular/core";
import { Localizations } from "./localizations";

@Injectable({
  providedIn: 'root'
})
export class LocalizationsService {

  getLocalization(domain: string, key: string): string {
    return Localizations[domain][key];
  }

}