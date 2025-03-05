import { Injectable } from "@angular/core";
import { Estate } from "src/app/estates/models/estate.model";

@Injectable({
  providedIn: 'root'
})
export class RentsCommandsService {

  constructor(){
    console.log('rents commands service constructor');
  }

  downloadRentReceipt(estate: Estate) {
    console.log('downloadRentReceipt', estate);
  }

  senRentReceiptByEmail(estate: Estate) {
    console.log('senRentReceiptByEmail', estate);
  }

  customizeRentReceipt(estate: Estate) {
    console.log('customizeRentReceipt', estate);
  }

}
