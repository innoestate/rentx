import { Estate_Form } from '../models/forms/estate-form.model';
import { Estate_Post_Request } from '../models/requests/estate-post-request.model';
import { FormGroup } from '@angular/forms';

export const formatEstateToEstateFormToEstatePostRequest = (estate: FormGroup<Estate_Form>): Estate_Post_Request => {

  return {
    street: estate.get('street')!.value,
    city: estate.get('city')!.value,
    zip: estate.get('zip')!.value,
    rent: estate.get('rent')?.value,
    charges: estate.get('charges')?.value,
    owner: estate.get('owner')?.value,
    lodger: estate.get('lodger')?.value
  }

}
