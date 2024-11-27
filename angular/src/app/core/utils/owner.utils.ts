import { Form, FormGroup } from "@angular/forms";
import { Owner_Form } from "../models/forms/owner-form.model";
import { Owner_Post_Request } from "../models/requests/owner-post-request.model";
import { Owner_Patch } from "../models/patchs/owners.patch.model";

export const formatOwnerFormValueToEstatePostRequest = (owner: FormGroup<Owner_Form>): Owner_Post_Request => {
  return {
    name: owner.get('name')!.value,
    street: owner.get('street')!.value,
    city: owner.get('city')!.value,
    zip: owner.get('zip')!.value,
    signature: owner.get('signature')?.value
  }
}

export const formatOwnerForPatch = (owner: FormGroup<Owner_Form>, id: string): Owner_Patch => {
  return {
    name: owner.get('name')!.value,
    street: owner.get('street')!.value,
    city: owner.get('city')!.value,
    zip: owner.get('zip')!.value,
    signature: owner.get('signature')?.value,
    id
  }
}
