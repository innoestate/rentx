import { FormGroup } from "@angular/forms";
import { Owner_Form } from "../models/forms/owner-form.model";
import { Owner_Post_Request } from "../models/requests/owner-post-request.model";

export const formatOwnerFormValueToEstatePostRequest = (owner: FormGroup<Owner_Form>): Owner_Post_Request => {
  return {
    name: owner.get('name')!.value,
    street: owner.get('street')!.value,
    city: owner.get('city')!.value,
    zip: owner.get('zip')!.value,
    signature: owner.get('signature')?.value
  }

}
