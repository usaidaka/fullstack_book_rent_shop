import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const ChangePassword = ({ login, token, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(login);
  console.log(token);
  console.log(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    // dispatch(
    //   doEditUser(data, () => {
    //     navigate('/admin/dashboard');
    //   })
    // );
  };
  return (
    <div className={classes.container}>
      <div className={classes.decoration}>
        <Link to="/admin/profile">
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="changePassword" />
        </h2>
      </div>
      <div className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.wrapper}>
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
            {/* {errors.password && <span role="alert">{errors.password.message}</span>} */}
          </div>

          <div className={classes.wrapper}>
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
            {/* {errors.confirmPassword && <span role="alert">{errors.confirmPassword.message}</span>} */}
          </div>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(ChangePassword);
