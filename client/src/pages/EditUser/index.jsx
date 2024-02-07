import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import config from '@config/index';

import classes from './style.module.scss';
import { doEditUser, getUserById } from './actions';
import { selectUserDetail } from './selectors';

const EditUser = ({ login, token, user, userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  console.log(user);
  console.log(login);
  console.log(token);
  console.log(id);
  console.log(userDetail);

  useEffect(() => {
    dispatch(
      getUserById(id, token, () => {
        setLoading(false);
      })
    );
  }, [dispatch, id, token]);

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
    console.log(image);
    dispatch(
      doEditUser(data, () => {
        navigate('/admin/dashboard');
      })
    );
  };

  if (loading) {
    return;
  }
  return (
    <div className={classes.container}>
      <div className={classes.decoration}>
        <Link to="/admin/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="editProfile" />
        </h2>
      </div>
      <div className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || `${config.api.image_customer}${userDetail.image}`} alt="" />
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
                defaultValue={userDetail.name}
              />
              {/* {errors.name && <span role="alert">{errors.name.message}</span>} */}
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
                {...register('email', {
                  required: 'email is required',
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
                value={userDetail.email}
                disabled
              />
              {/* {errors.email && <span role="alert">{errors.email.message}</span>} */}
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
                defaultValue={userDetail.phone}
              />
              {/* {errors.phone && <span role="alert">{errors.phone.message}</span>} */}
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
                defaultValue={userDetail.address}
              />
              {/* {errors.address && <span role="alert">{errors.address.message}</span>} */}
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
                {...register('password', {
                  required: 'password is required',
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
                value="**********"
                disabled
              />
              {/* {errors.password && <span role="alert">{errors.password.message}</span>} */}
            </div>
          </div>

          <Button className={classes.submit} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

EditUser.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(EditUser);
