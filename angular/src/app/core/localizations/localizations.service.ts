import { Injectable } from "@angular/core";
import { Localizations } from "./localizations";

@Injectable({
  providedIn: 'root'
})
export class LocalizationsService {

  getLocalization(set: string, key: string): string {
    try{
      return Localizations[set][key];
    }catch(e){
      return key;
    }
  }

}