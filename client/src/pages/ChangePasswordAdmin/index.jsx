import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedMessage } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { logout } from '@utils/logout';

import classes from './style.module.scss';
import { patchChangePassword } from './actions';

const ChangePasswordAdmin = () => {
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
    dispatch(
      patchChangePassword(data, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => logout(dispatch, navigate), 3000);
        setLoading(true);
      })
    );
  };
  return (
    <div data-testid="cpa-container" className={classes.container}>
      <div data-testid="cpa-decoration" className={classes.decoration}>
        <Link to="/admin/profile">
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="changePassword" />
        </h2>
      </div>
      <div data-testid="cpa-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="cpa-wrapper-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="newPassword" />
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="new password"
              {...register('newPassword', {
                required: 'New password is required',
              })}
              aria-invalid={errors.newPassword ? 'true' : 'false'}
            />
            {errors.newPassword && <span role="alert">{errors.newPassword.message}</span>}
          </div>

          <div data-testid="cpa-wrapper-confirm-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="confirmPassword" />
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) => value === watch('newPassword') || 'Passwords do not match',
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

ChangePasswordAdmin.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(ChangePasswordAdmin);
