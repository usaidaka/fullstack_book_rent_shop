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

import classes from './style.module.scss';
import { editProfile } from './actions';
import { doEditProfile } from '@pages/EditProfileAdmin/actions';
import toast, { Toaster } from 'react-hot-toast';
import { logout } from '@utils/logout';

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
    console.log(data);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('address', data.address);

    console.log(formData.get('file'));
    console.log(formData.get('name'));
    console.log(formData.get('phone'));

    dispatch(
      doEditProfile(formData, (message) => {
        toast.success(`${message} | You will redirect to log out`, { duration: 2000 });
        setTimeout(() => logout(dispatch, navigate), 3000);
        setLoading(true);
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || `${config.api.image_customer}${user.image}`} alt="" />
            </div>
          </div>
          <div className={classes['main-wrapper']}>
            <div className={classes.wrapper}>
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
              {errors.name && <span role="alert">{errors.name.message}</span>}
            </div>

            <div className={classes.wrapper}>
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

          <div className={classes['main-wrapper']}>
            <div className={classes.wrapper}>
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
            <div className={classes.wrapper}>
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

          <div className={classes.wrapper}>
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
              <Link to="/profile/change-password" className={classes.button}>
                <Button color="success" variant="contained" type="button">
                  <ModeEditOutlineIcon />
                </Button>
              </Link>
            </div>
          </div>

          <Button className={classes.submit} variant="contained" type="submit" disabled={loading}>
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
