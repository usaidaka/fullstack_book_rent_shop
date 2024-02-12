import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import config from '@config/index';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { logout } from '@utils/logout';
import { doEditProfile } from '@pages/EditProfileAdmin/actions';
import toast, { Toaster } from 'react-hot-toast';

import classes from './style.module.scss';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleFile = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('address', data.address);

    dispatch(
      doEditProfile(formData, (message) => {
        toast.success(`${message} | You will redirect to log out`, { duration: 2000 });
        setTimeout(() => logout(dispatch, navigate), 3000);
        setLoading(true);
      })
    );
  };

  return (
    <div data-testid="profile-container" className={classes.container}>
      <div data-testid="profile-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="profile-image" className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || `${config.api.image_customer}${user.image}`} alt="" />
            </div>
          </div>
          <div data-testid="profile-main-wrapper-name-email" className={classes['main-wrapper']}>
            <div data-testid="profile-wrapper-name" className={classes.wrapper}>
              <label htmlFor="">
                <FormattedMessage id="name" />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="name"
                {...register('name', {
                  required: 'name is required',
                })}
                aria-invalid={errors.name ? 'true' : 'false'}
                defaultValue={user.name}
              />
              {errors.name && (
                <span role="alert" className={classes['error-validation']}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div data-testid="profile-wrapper-email" className={classes.wrapper}>
              <label htmlFor="">
                <FormattedMessage id="email" />
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                value={user.email}
                disabled
              />
            </div>
          </div>

          <div data-testid="profile-main-wrapper-phone-address" className={classes['main-wrapper']}>
            <div data-testid="profile-wrapper-phone" className={classes.wrapper}>
              <label htmlFor="">
                <FormattedMessage id="phone" />
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="phone"
                {...register('phone', {
                  required: 'phone is required',
                })}
                aria-invalid={errors.phone ? 'true' : 'false'}
                defaultValue={user.phone}
              />
            </div>
            <div data-testid="profile-wrapper-address" className={classes.wrapper}>
              <label htmlFor="">
                <FormattedMessage id="address" />
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="address"
                {...register('address', {
                  required: 'address is required',
                })}
                aria-invalid={errors.address ? 'true' : 'false'}
                defaultValue={user.address}
              />
            </div>
          </div>

          <div data-testid="profile-wrapper-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="password" />
            </label>
            <div className={classes.password}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                aria-invalid={errors.password ? 'true' : 'false'}
                value="**********"
                disabled
              />
              <Link to="/profile/change-password" data-testid="profile-button" className={classes.button}>
                <Button color="success" variant="contained" type="button">
                  <ModeEditOutlineIcon />
                </Button>
              </Link>
            </div>
          </div>

          <Button
            data-testid="profile-submit"
            className={classes.submit}
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Profile);
