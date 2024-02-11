import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { encryptPayload } from '@utils/encrypt';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { doRegisterCustomer } from './actions';
import classes from './style.module.scss';

const RegisterCustomer = () => {
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
    console.log(data);
    const encryptedData = encryptPayload(data);

    dispatch(
      doRegisterCustomer({ encryptedData }, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => navigate('/admin/customer-list'), 3000);
        setLoading(true);
      })
    );
  };

  return (
    <div data-testid="rc-container" className={classes.container}>
      <div data-testid="rc-decoration" className={classes.decoration}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="registerCustomer" />
        </h2>
      </div>
      <div data-testid="rc-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="rc-main-wrapper-name-email" className={classes['main-wrapper']}>
            <div data-testid="rc-wrapper-name" className={classes.wrapper}>
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
              {errors.name && <span role="alert">{errors.name.message}</span>}
            </div>

            <div data-testid="rc-wrapper-email" className={classes.wrapper}>
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
              {errors.email && <span role="alert">{errors.email.message}</span>}
            </div>
          </div>

          <div data-testid="rc-main-wrapper-phone-address" className={classes['main-wrapper']}>
            <div data-testid="rc-wrapper-phone" className={classes.wrapper}>
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
              {errors.phone && <span role="alert">{errors.phone.message}</span>}
            </div>
            <div data-testid="rc-wrapper-address" className={classes.wrapper}>
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
              {errors.address && <span role="alert">{errors.address.message}</span>}
            </div>
          </div>

          <div data-testid="rc-wrapper-password" className={classes.wrapper}>
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
            {errors.password && <span role="alert">{errors.password.message}</span>}
          </div>

          <div data-testid="rc-wrapper-confirm-password" className={classes.wrapper}>
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
            {errors.confirmPassword && <span role="alert">{errors.confirmPassword.message}</span>}
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

RegisterCustomer.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(RegisterCustomer);
