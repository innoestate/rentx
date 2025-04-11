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

    const componentsList = ['navigation','actions', 'sellers'];
    const dynamicComponents: string[][] = [['navigation'], ['prospections'], ['actions']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['sellers'], ['actions']]);

  })

  it('should update dynamic components with a different table', () => {

    const componentsList = ['navigation','actions', 'prospections'];
    const dynamicComponents: string[][] = [['navigation'], ['sellers'], ['actions']];

    adapter.mapDynamicComponents(componentsList, dynamicComponents);
    expect(dynamicComponents).toEqual([['navigation'], ['prospections'], ['actions']]);

  })

});
