import { EDIT_PROFILE } from './constants';

export const doEditProfile = (user, header, cb) => ({
  type: EDIT_PROFILE,
  user,
  header,
  cb,
});
