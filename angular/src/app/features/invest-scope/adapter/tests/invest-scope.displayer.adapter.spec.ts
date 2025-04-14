import { InvestScopeDisplayerAdapter } from "../invest-scope.displayer.adapter";

const adapter = new InvestScopeDisplayerAdapter();

describe('InvestScopeDisplayerAdapter', () => {


  it('should update dynamic components', () => {

    const componentsList = ['navigation', 'prospections', 'actions'];
    const dynamicComponents: string[][] = [];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions']]);

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: string[][] = [['navigation'], ['prospections'], ['actions']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions']]);

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: string[][] = [['navigation'], ['sellers'], ['actions']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions']]);

  })

  it('should show a description of a selected prospection', () => {

    const componentsList = ['navigation', 'actions', 'prospectionDescription', 'prospections'];
    const dynamicComponents: string[][] = [['navigation'], ['prospections'], ['actions']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions', 'prospectionDescription']]);

  })

  it('should remove a description of a selected prospection', () => {

    const componentsList = ['navigation', 'actions', 'prospections'];
    const dynamicComponents: string[][] = [['navigation'], ['prospections'], ['actions', 'prospectionDescription']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions']]);

  })



});
