import { PATCH_CHANGE_PASSWORD_ADMIN } from './constants';

export const patchChangePassword = (data, cb) => ({
  type: PATCH_CHANGE_PASSWORD_ADMIN,
  data,
  cb,
});
