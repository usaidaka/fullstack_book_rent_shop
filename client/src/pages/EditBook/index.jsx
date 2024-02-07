import { useEffect, useRef, useState } from 'react';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import config from '@config/index';

import classes from './style.module.scss';
import { selectBookDetail } from './selectors';
import { getBookById } from './actions';

const EditBook = ({ login, token, user, book }) => {
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const { id } = useParams();
  console.log(id);
  console.log(book);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const handleFile = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(image);
    // dispatch();
    // doRegister(data, () => {
    //   navigate('/admin/dashboard');
    // })
  };
  return (
    <div className={classes['main-container']}>
      <h2>
        <FormattedMessage id="editBook" />
      </h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.container}>
          <div className={classes['form-input']}>
            <div className={classes['main-wrapper']}>
              <div className={classes.wrapper}>
                <label htmlFor="">
                  <FormattedMessage id="title" />
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  {...register('title', {
                    required: 'title is required',
                  })}
                  aria-invalid={errors.title ? 'true' : 'false'}
                  defaultValue={book.title}
                />
                {/* {errors.title && <span role="alert">{errors.title.message}</span>} */}
              </div>
              <div className={classes.wrapper}>
                <label htmlFor="">
                  <FormattedMessage id="author" />
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="author"
                  {...register('author', {
                    required: 'author is required',
                  })}
                  aria-invalid={errors.author ? 'true' : 'false'}
                  defaultValue={book.author}
                />
                {/* {errors.author && <span role="alert">{errors.author.message}</span>} */}
              </div>
            </div>
            <div className={classes['main-wrapper']}>
              <div className={classes.wrapper}>
                <label htmlFor="">
                  <FormattedMessage id="synopsis" />
                </label>
                <textarea
                  type="text"
                  id="synopsis"
                  name="synopsis"
                  placeholder="synopsis"
                  {...register('synopsis', {
                    required: 'synopsis is required',
                  })}
                  aria-invalid={errors.author ? 'true' : 'false'}
                  defaultValue={book.synopsis}
                />
                {/* {errors.synopsis && <span role="alert">{errors.synopsis.message}</span>} */}
              </div>
              <div className={classes['form-select']}>
                <div className={classes.select}>
                  <label htmlFor="">
                    <FormattedMessage id="category" />
                  </label>
                  <select
                    id="category"
                    name="category"
                    placeholder="category"
                    {...register('category', {
                      required: 'category is required',
                    })}
                    aria-invalid={errors.category ? 'true' : 'false'}
                  >
                    <option value="" disabled>
                      Select Option
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {/* {errors.category && <span role="alert">{errors.category.message}</span>} */}
                </div>
                <div className={classes.date}>
                  <label htmlFor="">
                    <FormattedMessage id="publishAt" />
                  </label>
                  <input
                    type="date"
                    id="publishAt"
                    name="publishAt"
                    placeholder="publishAt"
                    {...register('publishAt', {
                      required: 'publishAt is required',
                    })}
                    aria-invalid={errors.publishAt ? 'true' : 'false'}
                    max={new Date().toISOString().split('T')[0]}
                    defaultChecked={book.publishAt}
                  />
                  {/* {errors.publishAt && <span role="alert">{errors.publishAt.message}</span>} */}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || `${config.api.image_book}${book.image}`} alt="" />
            </div>
          </div>
        </div>
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

EditBook.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
  book: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
  book: selectBookDetail,
});

export default connect(mapStateToProps)(EditBook);
