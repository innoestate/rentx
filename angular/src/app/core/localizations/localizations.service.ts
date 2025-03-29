import { Injectable } from "@angular/core";
import { Localizations } from "./localizations";

@Injectable({
  providedIn: 'root'
})
export class LocalizationsService {

  getLocalization(domain: string, key: string): string {
    try{
      return Localizations[domain][key];
    }catch(e){
      return key;
    }
  }

}