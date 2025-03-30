import { Localizations } from "../../angular/src/app/core/localizations/localizations"
import { prospectionsColumnModel } from "../../angular/src/app/features/prospections/adapters/table/prospections.table.adapter.type"
import { IsButtonDisabled, IsButtonEnabled } from "../../angular/src/app/ui/components/ui-button/test/helpers/ui-button.cypress.helper.cy"
import { TypeTextInput } from "../../angular/src/app/ui/components/ui-form/tests/helpers/ui-form.cypress.helper"
import { ClickOnValidate } from "../../angular/src/app/ui/components/ui-popup/tests/helpers/ui-popup.cypress.helper"
import { HasNoRow, HasRow, testEditableFields } from "../../angular/src/app/ui/components/ui-table/test/helper/ui-table.cypress.helper"
import { isSuccessMessageDisplayed } from "../../angular/src/app/ui/services/message/test/message.cypress.helper"
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

  it('should enable validated button', function () {
    IsButtonDisabled();
    TypeTextInput('link', 'https://link1234');
    IsButtonEnabled();
  })

  it('should add a prospection', function () {
    TypeTextInput('link', 'https://link1234');
    HasNoRow(0);
    ClickOnValidate();
    HasRow(0);
    isSuccessMessageDisplayed(Localizations.prospections.addProspectionSuccess);
  })

  it('should update a field of prospection', function () {
    TypeTextInput('link', 'https://link1234');
    HasNoRow(0);
    ClickOnValidate();
    HasRow(0);
    cy.get('[test-selector="ui-popup-close-button"]').click();
    testEditableFields(prospectionsColumnModel, 0);
    isSuccessMessageDisplayed(Localizations.prospections.updateProspectionSuccess);
  })

})