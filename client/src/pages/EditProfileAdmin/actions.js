import { EDIT_PROFILE } from './constants';

export const doEditProfile = (user, cb) => ({
  type: EDIT_PROFILE,
  user,
  cb,
});
