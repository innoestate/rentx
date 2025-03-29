import { IsButtonDisabled, IsButtonEnabled } from "../../angular/src/app/ui/components/ui-button/test/helpers/ui-button.cypress.helper.cy"
import { TypeTextInput } from "../../angular/src/app/ui/components/ui-form/tests/helpers/ui-form.cypress.helper"
import { ClickOnValidate } from "../../angular/src/app/ui/components/ui-popup/tests/helpers/ui-popup.cypress.helper"
import { HasNoRow, HasRow } from "../../angular/src/app/ui/components/ui-table/test/helper/ui-table.cypress.helper"
import { johnDoe } from "../support/mocks/user.mock"

describe('prospection page', function () {

  beforeEach(function () {
    cy.preparDb()
    cy.login(johnDoe)

    cy.get('[test-selector="prospections-menu-routerLink"]').click();
    cy.get('[test-selector="create-new-prospection-button"]').click();

  })

  it('should be on prospections page', function () {
    cy.url().should('eq', 'http://localhost:4200/desktop/me/dashboard/prospections/main');
  })

  it('should have the confirm button disabled', function () {
    IsButtonDisabled();
  })

  it('should enabled confirmation button', function () {
    TypeTextInput('link', 'https://link1234');
    IsButtonEnabled();
  })

  it('should add a prospection', function () {
    TypeTextInput('link', 'https://link1234');
    HasNoRow(0);
    ClickOnValidate();
    HasRow(0);
  })

})