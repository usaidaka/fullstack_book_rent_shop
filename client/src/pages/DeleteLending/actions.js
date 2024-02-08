import { DELETE_LENDING } from './constants';

export const deleteLending = (data, cb) => ({
  type: DELETE_LENDING,
  data,
  cb,
});
