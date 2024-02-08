import { EDIT_PROFILE } from './constants';

export const editProfile = (user, cb) => ({
  type: EDIT_PROFILE,
  user,
  cb,
});
