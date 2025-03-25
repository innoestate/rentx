import { sellersReducer, initialState, SellersState } from '../sellers.reducer';
import {
  createSellerSuccess,
  loadSellersSuccess,
  removeSellerSuccess,
  updateSellerSuccess
} from '../sellers.actions';
import { sellerDtoMock1, sellerDtoMock2 } from '../../../mocks/sellers.dto.mock';

describe('Sellers ngrx Reducer', () => {
  it('should return the default state', () => {
    const state = sellersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should load sellers', () => {
    const sellers = [{ ...sellerDtoMock1 }];
    const state = sellersReducer(initialState, loadSellersSuccess({ sellers }));
    expect(state.sellers).toEqual(sellers);
  });

  it('should add a new seller', () => {
    const seller = { ...sellerDtoMock2 };
    const state = sellersReducer(initialState, createSellerSuccess({ seller }));
    expect(state.sellers).toContain(seller);
  });

  it('should delete a seller', () => {
    const initialStateWithSellers: SellersState = {
      sellers: [{ ...sellerDtoMock1 }]
    };
    const state = sellersReducer(initialStateWithSellers, removeSellerSuccess({ id: sellerDtoMock1.id! }));
    expect(state.sellers.length).toBe(0);
  });

  it('should update a seller', () => {
    const initialStateWithSellers: SellersState = {
      sellers: [{ ...sellerDtoMock1 }]
    };
    const updatedSeller = {
      ...sellerDtoMock1,
      name: 'Updated Name',
      email: 'updated@example.com'
    };
    const state = sellersReducer(initialStateWithSellers, updateSellerSuccess({ seller: updatedSeller }));
    expect(state.sellers[0].name).toBe('Updated Name');
    expect(state.sellers[0].email).toBe('updated@example.com');
  });

  it('should preserve other sellers when updating one', () => {
    const initialStateWithSellers: SellersState = {
      sellers: [{ ...sellerDtoMock1 }, { ...sellerDtoMock2 }]
    };
    const updatedSeller = {
      ...sellerDtoMock1,
      name: 'Updated Name'
    };
    const state = sellersReducer(initialStateWithSellers, updateSellerSuccess({ seller: updatedSeller }));
    expect(state.sellers.length).toBe(2);
    expect(state.sellers.find(s => s.id === sellerDtoMock1.id)?.name).toBe('Updated Name');
    expect(state.sellers.find(s => s.id === sellerDtoMock2.id)).toEqual(sellerDtoMock2);
  });
});
