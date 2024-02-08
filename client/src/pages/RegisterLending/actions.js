import { POST_LENDING } from './constants';

export const doRegisterLending = (data, cb) => ({
  type: POST_LENDING,
  data,
  cb,
});
