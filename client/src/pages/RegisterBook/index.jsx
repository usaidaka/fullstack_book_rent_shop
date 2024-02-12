import { useRef, useState } from 'react';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectCategoryList } from '@pages/Dashboard/selectors';
import toast, { Toaster } from 'react-hot-toast';

import empty from '../../assets/empty.jpg';
import classes from './style.module.scss';
import { doRegisterBook } from './actions';

const RegisterBook = ({ categories }) => {
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('idCategory', data.idCategory);
    formData.append('publishAt', data.publishAt.split('-')[0]);
    formData.append('synopsis', data.synopsis);

    dispatch(
      doRegisterBook(formData, (message) => {
        toast.success(message, { duration: 2000 });
        setTimeout(() => navigate('/admin/book-list'), 3000);
        setLoading(true);
      })
    );
  };

  return (
    <div data-testid="rb-main-container" className={classes['main-container']}>
      <h2>
        <FormattedMessage id="registerBook" />
      </h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div data-testid="rb-container" className={classes.container}>
          <div data-testid="rb-form-input" className={classes['form-input']}>
            <div data-testid="rb-main-wrapper-title-author" className={classes['main-wrapper']}>
              <div data-testid="rb-wrapper-title" className={classes.wrapper}>
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
                />
                {errors.title && (
                  <span role="alert" className={classes['error-validation']}>
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div data-testid="rb-wrapper-author" className={classes.wrapper}>
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
                />
                {errors.author && (
                  <span role="alert" className={classes['error-validation']}>
                    {errors.author.message}
                  </span>
                )}
              </div>
            </div>
            <div data-testid="rb-main-wrapper-synopsis-category-date" className={classes['main-wrapper']}>
              <div data-testid="rb-wrapper-synopsis" className={classes.wrapper}>
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
                />
                {errors.synopsis && (
                  <span role="alert" className={classes['error-validation']}>
                    {errors.synopsis.message}
                  </span>
                )}
              </div>
              <div data-testid="rb-form-select" className={classes['form-select']}>
                <div data-testid="rb-wrapper-select" className={classes.select}>
                  <label htmlFor="">
                    <FormattedMessage id="category" />
                  </label>
                  <select
                    id="idCategory"
                    name="idCategory"
                    placeholder="idCategory"
                    {...register('idCategory', {
                      required: 'Category is required',
                    })}
                    aria-invalid={errors.idCategory ? 'true' : 'false'}
                  >
                    <option value="" disabled>
                      Select Option
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.idCategory && (
                    <span role="alert" className={classes['error-validation']}>
                      {errors.idCategory.message}
                    </span>
                  )}
                </div>
                <div data-testid="rb-wrapper-date" className={classes.date}>
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
                  />
                  {errors.publishAt && (
                    <span role="alert" className={classes['error-validation']}>
                      {errors.publishAt.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div data-testid="rb-image" className={classes.image}>
            <input
              type="file"
              ref={fileRef}
              onChange={handleFile}
              id="image"
              name="image"
              aria-invalid={errors.image ? 'true' : 'false'}
              accept="image/png, image/gif, image/jpeg"
            />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || empty} alt="" />
              {errors.image && <p role="alert">{errors.image.message}</p>}
            </div>
          </div>
        </div>
        <Button variant="contained" type="submit" disabled={loading}>
          submit
        </Button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

RegisterBook.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
  categories: selectCategoryList,
});

export default connect(mapStateToProps)(RegisterBook);
