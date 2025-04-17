import { EventEmitter } from "@angular/core";
import { InvestScopeDisplayerAdapter } from "../invest-scope.displayer.adapter";
import { UiDynamicComponent } from "src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model";

const adapter = new InvestScopeDisplayerAdapter();

describe('InvestScopeDisplayerAdapter', () => {

  const fillCase = (dynamicComponents: UiDynamicComponent[][], row: number, column: number, name: string ) => {
    dynamicComponents[row][column] = { name, replace: new EventEmitter() };
    spyOn(dynamicComponents[row][column].replace, 'emit');
  }

  it('should update dynamic components', done => {

    const componentsList = ['navigation', 'prospections', 'actions'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);

    spyOn(dynamicComponents[0][0].replace, 'emit');
    spyOn(dynamicComponents[1][0].replace, 'emit');
    spyOn(dynamicComponents[2][0].replace, 'emit');

    setTimeout(() => {
      expect(dynamicComponents[0][0].replace.emit).toHaveBeenCalledWith('navigation');
      expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('prospections');
      expect(dynamicComponents[2][0].replace.emit).toHaveBeenCalledWith('actions');
      done();
    }, 0);

    adapter.mapDynamicComponents(componentsList, dynamicComponents);

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'sellers'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0,0, 'navigation');
    fillCase(dynamicComponents, 1,0, 'prospections');
    fillCase(dynamicComponents, 2,0, 'actions');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('sellers');
    expect(dynamicComponents[2][0].replace.emit).not.toHaveBeenCalledWith('actions');

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0,0, 'navigation');
    fillCase(dynamicComponents, 1,0, 'sellers');
    fillCase(dynamicComponents, 2,0, 'actions');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('prospections');

  })

  it('should show a description of a selected prospection', () => {

    const componentsList = ['navigation', 'actions', 'prospectionDescription', 'prospections'];

    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0,0, 'navigation');
    fillCase(dynamicComponents, 1,0, 'prospections');
    fillCase(dynamicComponents, 2,0, 'actions');
    fillCase(dynamicComponents, 2,1, 'prospectionDescription');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('prospections');
    expect(dynamicComponents[2][1].replace.emit).toHaveBeenCalledWith('prospectionDescription');

  })

  it('should remove a description of a selected prospection', () => {
    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0, 0, 'navigation');
    fillCase(dynamicComponents, 1, 0, 'prospections');
    fillCase(dynamicComponents, 2, 0, 'actions');
    fillCase(dynamicComponents, 2, 1, 'prospectionDescription');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[2][1].replace.emit).toHaveBeenCalledWith('');
  });

  it('should replace an empty case by a selected prospection', () => {
    const componentsList = ['navigation', 'actions', 'prospections', 'prospectionDescription'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0, 0, 'navigation');
    fillCase(dynamicComponents, 1, 0, 'prospections');
    fillCase(dynamicComponents, 2, 0, 'actions');
    fillCase(dynamicComponents, 2, 1, '');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[2][1].replace.emit).toHaveBeenCalledWith('prospectionDescription');
  });

  it('should update components when sellers is in the list', () => {
    const componentsList = ['navigation', 'actions', 'sellers'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0, 0, 'navigation');
    fillCase(dynamicComponents, 1, 0, 'prospections');
    fillCase(dynamicComponents, 2, 0, 'actions');
    fillCase(dynamicComponents, 2, 1, '');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[1][0].replace.emit).toHaveBeenCalledWith('sellers');
  });

  it('should clear prospectionDescription when not in component list', () => {
    const componentsList = ['navigation', 'actions', 'sellers'];
    const dynamicComponents: UiDynamicComponent[][] = [];
    InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
    fillCase(dynamicComponents, 0, 0, 'navigation');
    fillCase(dynamicComponents, 1, 0, 'prospections');
    fillCase(dynamicComponents, 2, 0, 'actions');
    fillCase(dynamicComponents, 2, 1, 'prospectionDescription');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[2][1].replace.emit).toHaveBeenCalledWith('');
  });

});
