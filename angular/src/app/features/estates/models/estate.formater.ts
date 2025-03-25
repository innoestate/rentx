import { FormGroup } from "@angular/forms";
import { Estate_Form } from "./estate-form.model";
import { Estate_Post_Request } from "./estate-post-request.model";

export const formatEstateForPostRequest = (estate: FormGroup<Estate_Form>): Estate_Post_Request => {
  let ownerId = estate.get('owner_id')?.value;
  return {
    street: estate.get('street')!.value,
    city: estate.get('city')!.value,
    zip: estate.get('zip')!.value,
    plot: estate.get('plot')?.value,
    rent: estate.get('rent')?.value,
    charges: estate.get('charges')?.value,
    owner_id: ownerId as any,
    lodger_id: estate.get('lodger')?.value
  }

}
