import { Injectable } from "@angular/core";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";


@Injectable({ providedIn: 'root' })
export class LodgersCommandsService {

    createPopupFields: UiFormFieldData[] = [
      {
        key: 'name',
        label: 'Nom et prénom',
        type: 'text',
        required: true
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        required: false
      }
    ]

    createLodger() {}

    deleteLodger(lodgerId: string) {}

}
