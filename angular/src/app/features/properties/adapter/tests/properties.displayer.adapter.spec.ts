import { EventEmitter } from "@angular/core";
import { UiDynamicComponent } from "src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model";
import { PropertiesDisplayAdapter } from "../properties.displayer.adapter";

const adapter = new PropertiesDisplayAdapter();

describe('PropertiesDisplayAdapter', () => {

  const fillCase = (dynamicComponents: UiDynamicComponent[][], row: number, column: number, name: string ) => {
    dynamicComponents[row][column] = { name, replace: new EventEmitter() };
    spyOn(dynamicComponents[row][column].replace, 'emit');
  }

  it('should update dynamic components', done => {

    const componentsList = ['navigation', 'estates', 'actions'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    PropertiesDisplayAdapter.fillDynamicComponents(dynamicComponents);

    spyOn(dynamicComponents[0][0].replace, 'emit');
    spyOn(dynamicComponents[1][0].replace, 'emit');
    spyOn(dynamicComponents[2][0].replace, 'emit');

    setTimeout(() => {
      expect(dynamicComponents[0][0].replace.emit).toHaveBeenCalledWith('navigation');
      expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('estates');
      expect(dynamicComponents[2][0].replace.emit).toHaveBeenCalledWith('actions');
      done();
    }, 0);

    adapter.mapDynamicComponents(componentsList, dynamicComponents);

  })

  it('should navigate', done => {

    const componentsList = ['navigation', 'owners', 'actions'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    PropertiesDisplayAdapter.fillDynamicComponents(dynamicComponents);

    fillCase(dynamicComponents, 0, 0, 'navigation');
    fillCase(dynamicComponents, 1, 0, 'estates');
    fillCase(dynamicComponents, 2, 0, 'actions');

    setTimeout(() => {
      expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('owners');
      done();
    }, 0);

    adapter.mapDynamicComponents(componentsList, dynamicComponents);

  })

});
