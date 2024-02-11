import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedMessage } from 'react-intl';
import { selectBookList } from '@pages/Book/selectors';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { getLending } from '@pages/LendingList/actions';

import classes from './style.module.scss';
import { deleteLending } from './actions';

const DeleteLending = ({ books }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      deleteLending(data, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => navigate('/admin/lending-list'), 3000);
        setLoading(true);
        dispatch(getLending());
      })
    );
  };
  return (
    <div data-testid="dl-container" className={classes.container}>
      <div data-testid="dl-decoration" className={classes.decoration}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="deleteLending" />
        </h2>
      </div>
      <div data-testid="dl-form" className={classes.form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div data-testid="dl-wrapper-email" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="email" />
            </label>
            <input
              type="email"
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

          <div data-testid="dl-wrapper-book" className={classes.wrapper}>
            <label htmlFor="">
              <FormattedMessage id="book" />
            </label>
            <select
              id="idBook"
              name="idBook"
              placeholder="idBook"
              {...register('idBook', {
                required: 'Book is optional',
              })}
              aria-invalid={errors.idBook ? 'true' : 'false'}
            >
              <option id="idBook" value="">
                Select Option
              </option>
              {books.map((book) => (
                <option id="idBook" key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            {errors.idBook && <span role="alert">{errors.idBook.message}</span>}
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

DeleteLending.propTypes = {
  books: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  books: selectBookList,
});

export default connect(mapStateToProps)(DeleteLending);
