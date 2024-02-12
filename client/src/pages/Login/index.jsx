import { useForm } from 'react-hook-form';
import { encryptPayload } from '@utils/encrypt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { doLoginAction } from './actions';
import classes from './style.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const encryptedData = encryptPayload(data);
    dispatch(
      doLoginAction(
        { encryptedData },
        (role, message) => {
          toast.success(message, { duration: 1000 });
          setLoading(true);
          if (role === 'Super' || role === 'Admin') {
            setTimeout(() => navigate('/admin/dashboard'), 2000);
          } else {
            setTimeout(() => navigate('/home'), 2000);
          }
        },
        (err) => {
          toast.error(err);
        }
      )
    );
  };

  return (
    <div data-testid="login-container" className={classes.container}>
      <div data-testid="login-decoration" className={classes.decoration} />

      <div data-testid="login-form" className={classes.form}>
        <h2>
          <FormattedMessage id="login" />
        </h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="login-wrapper-email" className={classes.wrapper}>
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
          <div data-testid="login-wrapper-password" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="password" />
            </label>
            <div data-testid="login-input-password" className={classes['input-password']}>
              <input
                type={visibility ? 'password' : 'text'}
                id="password"
                name="password"
                placeholder="password"
                {...register('password', {
                  required: 'password is required',
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <div
                onClick={() => setVisibility(!visibility)}
                data-testid="login-visibility"
                className={classes.visibility}
              >
                {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            {errors.password && <span role="alert">{errors.password.message}</span>}
          </div>
          <Button variant="contained" type="submit" size="small" disabled={loading}>
            Submit
          </Button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
