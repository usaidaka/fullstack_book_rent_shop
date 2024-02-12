import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { encryptPayload } from '@utils/encrypt';

import classes from './style.module.scss';
import { doRegister } from './actions';

const RegisterAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const encryptedData = encryptPayload(data);

    dispatch(
      doRegister({ encryptedData }, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => navigate('/admin/admin-list'), 3000);
        setLoading(true);
      })
    );
  };

  return (
    <div data-testid="ra-container" className={classes.container}>
      <div data-testid="ra-decoration" className={classes.decoration}>
        <h2>
          <FormattedMessage id="registerAdmin" />
        </h2>
      </div>
      <div data-testid="ra-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="ra-main-wrapper-name-email" className={classes['main-wrapper']}>
            <div data-testid="ra-wrapper-name" className={classes.wrapper}>
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
              />
              {errors.name && (
                <span role="alert" className={classes['error-validation']}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div data-testid="ra-wrapper-email" className={classes.wrapper}>
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
              />
              {errors.email && (
                <span role="alert" className={classes['error-validation']}>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div data-testid="ra-main-wrapper-phone-address" className={classes['main-wrapper']}>
            <div data-testid="ra-wrapper-phone" className={classes.wrapper}>
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
              />
              {errors.phone && (
                <span role="alert" className={classes['error-validation']}>
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div data-testid="ra-wrapper-address" className={classes.wrapper}>
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
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.address && (
                <span role="alert" className={classes['error-validation']}>
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          <div data-testid="ra-wrapper-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="password" />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              {...register('password', {
                required: 'password is required',
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <span role="alert" className={classes['error-validation']}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div data-testid="ra-wrapper-confirm-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="confirmPassword" />
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              {...register('confirmPassword', {
                required: 'confirmPassword is required',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            {errors.confirmPassword && (
              <span role="alert" className={classes['error-validation']}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button variant="contained" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

RegisterAdmin.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(RegisterAdmin);
