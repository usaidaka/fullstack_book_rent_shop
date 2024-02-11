import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import config from '@config/index';
import toast, { Toaster } from 'react-hot-toast';

import classes from './style.module.scss';
import { doEditUser, getUserById } from './actions';
import { selectUserDetail } from './selectors';

const EditUser = ({ userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    dispatch(
      getUserById(id, () => {
        setRender(false);
      })
    );
  }, [dispatch, id]);

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
      doEditUser(id, formData, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => navigate(-1), 3000);
        setLoading(true);
      })
    );
  };

  if (render) {
    return;
  }
  return (
    <div data-testid="eu-container" className={classes.container}>
      <div data-testid="eu-decoration" className={classes.decoration}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="editProfile" />
        </h2>
      </div>
      <div data-testid="eu-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="eu-image" className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || `${config.api.image_customer}${userDetail.image}`} alt="" />
            </div>
          </div>
          <div data-testid="eu-main-wrapper-name-email" className={classes['main-wrapper']}>
            <div data-testid="eu-wrapper-name" className={classes.wrapper}>
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
                defaultValue={userDetail.name}
              />
              {errors.name && <span role="alert">{errors.name.message}</span>}
            </div>

            <div data-testid="eu-wrapper-email" className={classes.wrapper}>
              <label htmlFor="">
                <FormattedMessage id="email" />
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                value={userDetail.email}
                disabled
              />
              {errors.email && <span role="alert">{errors.email.message}</span>}
            </div>
          </div>

          <div data-testid="eu-main-wrapper-phone-address" className={classes['main-wrapper']}>
            <div data-testid="eu-wrapper-phone" className={classes.wrapper}>
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
                defaultValue={userDetail.phone}
              />
              {errors.phone && <span role="alert">{errors.phone.message}</span>}
            </div>
            <div data-testid="eu-wrapper-address" className={classes.wrapper}>
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
                defaultValue={userDetail.address}
              />
              {errors.address && <span role="alert">{errors.address.message}</span>}
            </div>
          </div>

          <div data-testid="eu-wrapper-password" className={classes.wrapper}>
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
              {errors.password && <span role="alert">{errors.password.message}</span>}
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

EditUser.propTypes = {
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(EditUser);
