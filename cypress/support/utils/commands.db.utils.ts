import { environment } from "../../../angular/src/environments/environment";

export const resetDb = () => {
    const request = {
        method: 'GET',
        url: `${environment.apiURL}/dev/resetDb`,
    };
    cy.request(request);
}