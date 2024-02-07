import { produce } from 'immer';
import { SET_CUSTOMER } from './constants';

export const initialState = {
  customers: [],
};

export const storedKey = ['customers'];

const customerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CUSTOMER:
        draft.customers = action.customers;
        break;
    }
  });

export default customerReducer;
