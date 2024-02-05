import { useForm } from 'react-hook-form';
import { encryptPayload } from '@utils/encrypt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import { doLoginAction } from './actions';
import classes from './style.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className={classes.container}>
      <div className={classes.decoration} />

      <div className={classes.form}>
        <h2>
          <FormattedMessage id="login" />
        </h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
          </div>
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