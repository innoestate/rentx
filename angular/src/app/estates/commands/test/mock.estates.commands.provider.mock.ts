import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProviderMock {

  constructor() {}

  createEstate(){
    return () => console.log('create estate mocked empty function executed');
  }

}
