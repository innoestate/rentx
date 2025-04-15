import { EventEmitter } from "@angular/core";
import { InvestScopeDisplayerAdapter } from "../invest-scope.displayer.adapter";

const adapter = new InvestScopeDisplayerAdapter();

describe('InvestScopeDisplayerAdapter', () => {


  it('should update dynamic components', () => {

    const componentsList = ['navigation', 'prospections', 'actions'];
    const dynamicComponents: {name: string, replace: EventEmitter<string>}[][] = [];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    console.log('dynamicComponents', dynamicComponents[0][0].name);
    expect(dynamicComponents[0][0].name).toEqual('navigation');
    expect(dynamicComponents[1][0].name).toEqual('prospections');
    expect(dynamicComponents[2][0].name).toEqual('actions');

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: {name: string, replace: EventEmitter<string>}[][] = [[{name: 'navigation', replace: new EventEmitter()}], [{name: 'prospections', replace: new EventEmitter()}], [{name: 'actions', replace: new EventEmitter()}]];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[0][0].name).toEqual('navigation');
    expect(dynamicComponents[1][0].name).toEqual('prospections');
    expect(dynamicComponents[2][0].name).toEqual('actions');

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: {name: string, replace: EventEmitter<string>}[][] = [[{name: 'navigation', replace: new EventEmitter()}], [{name: 'sellers', replace: new EventEmitter()}], [{name: 'actions', replace: new EventEmitter()}]];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[0][0].name).toEqual('navigation');
    expect(dynamicComponents[1][0].name).toEqual('sellers');
    expect(dynamicComponents[2][0].name).toEqual('actions');

  })

  it('should show a description of a selected prospection', () => {

    const componentsList = ['navigation', 'actions', 'prospectionDescription', 'prospections'];
    const dynamicComponents: {name: string, replace: EventEmitter<string>}[][] = [[{name: 'navigation', replace: new EventEmitter()}], [{name: 'prospections', replace: new EventEmitter()}], [{name: 'actions', replace: new EventEmitter()}]];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[0][0].name).toEqual('navigation');
    expect(dynamicComponents[1][0].name).toEqual('prospections');
    expect(dynamicComponents[2][0].name).toEqual('actions');
    expect(dynamicComponents[2][1].name).toEqual('prospectionDescription');

  })

  it('should remove a description of a selected prospection', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: {name: string, replace: EventEmitter<string>}[][] = [[{name: 'navigation', replace: new EventEmitter()}], [{name: 'prospections', replace: new EventEmitter()}], [{name: 'actions', replace: new EventEmitter()}, {name: 'prospectionDescription', replace: new EventEmitter()}]];
    spyOn(dynamicComponents[2][1].replace, 'emit');

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents[0][0].name).toEqual('navigation');
    expect(dynamicComponents[1][0].name).toEqual('prospections');
    expect(dynamicComponents[2][0].name).toEqual('actions');
    expect(dynamicComponents[2][1].name).toEqual('prospectionDescription');
    expect(dynamicComponents[2][1].replace.emit).toHaveBeenCalledWith('');

  })



});
