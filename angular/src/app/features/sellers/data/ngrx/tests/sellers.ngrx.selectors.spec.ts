import { selectSellersState, selectAllSellers } from '../sellers.selectors';
import { SellersState } from '../sellers.reducer';
import { sellerDtoMock1, sellerDtoMock2 } from '../../../mocks/sellers.dto.mock';

describe('Sellers ngrx Selectors', () => {
  const initialState: SellersState = {
    sellers: [
      { ...sellerDtoMock1 },
      { ...sellerDtoMock2 }
    ]
  };

  it('should select the feature state', () => {
    const result = selectSellersState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all sellers', () => {
    const result = selectAllSellers.projector(initialState);
    expect(result).toEqual(initialState.sellers);
  });

  it('should reflect updated seller in the selected sellers', () => {
    const updatedSeller = { ...sellerDtoMock1, name: 'Updated Name' };
    const updatedState: SellersState = {
      sellers: [
        updatedSeller,
        { ...sellerDtoMock2 }
      ]
    };
    const result = selectAllSellers.projector(updatedState);
    expect(result[0].name).toBe('Updated Name');
  });
});
