import { Localizations } from "../../angular/src/app/core/localizations/localizations"
import { prospectionsColumnModel } from "../../angular/src/app/features/prospections/adapters/table/prospections.table.adapter.type"
import { IsButtonDisabled, IsButtonEnabled } from "../../angular/src/app/ui/components/ui-button/test/helpers/ui-button.cypress.helper.cy"
import { TypeTextInput } from "../../angular/src/app/ui/components/ui-form/tests/helpers/ui-form.cypress.helper"
import { ClickOnValidate, ClosePopup } from "../../angular/src/app/ui/components/ui-popup/tests/helpers/ui-popup.cypress.helper"
import { triggerDropdownAction, HasNoRow, HasRow, testEditableFields } from "../../angular/src/app/ui/components/ui-table/test/helper/ui-table.cypress.helper"
import { isSuccessMessageDisplayed } from "../../angular/src/app/ui/services/message/test/message.cypress.helper"
import { johnDoe } from "../support/mocks/user.mock"

describe('prospection page', function () {

  beforeEach(function () {
    cy.preparDb()
    cy.login(johnDoe)
    navigateAndOpenProspectionCreationForm();
  })

  it('should be on prospections page', function () {
    cy.url().should('eq', 'http://localhost:4200/desktop/me/dashboard/prospections/main');
  })

  it('should verify validated button enable status', function () {
    IsButtonDisabled();
    TypeTextInput('link', 'https://link1234');
    IsButtonEnabled();
  })

  it('should add a field and verify updates fields', function () {
    TypeTextInput('link', 'https://link1234');
    HasNoRow(0);
    ClickOnValidate();
    isSuccessMessageDisplayed(Localizations.prospections.addProspectionSuccess);
    HasRow(0);
    ClosePopup();
    testEditableFields(prospectionsColumnModel, 0);
    isSuccessMessageDisplayed(Localizations.prospections.updateProspectionSuccess);
  })

  it('should delete a prospection', function () {
    TypeTextInput('link', 'https://link1234');
    ClickOnValidate();
    ClosePopup();
    triggerDropdownAction(0, 7, Localizations.commons.delete);
    HasNoRow(0);
    isSuccessMessageDisplayed(Localizations.prospections.deleteProspectionSuccess);
  })

  const navigateAndOpenProspectionCreationForm = () => {
    cy.get('[test-selector="prospections-menu-routerLink"]').click();
    cy.get('[test-selector="create-new-prospection-button"]').click();
  }

})