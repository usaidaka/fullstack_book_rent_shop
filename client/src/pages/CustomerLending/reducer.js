import { produce } from 'immer';
import { SET_CUSTOMER_LENDING } from './constants';

export const initialState = {
  customerLending: [],
};

export const storedKey = [''];

const getCustomerLending = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CUSTOMER_LENDING:
        draft.customerLending = action.customerLending;
        break;
    }
  });

export default getCustomerLending;
