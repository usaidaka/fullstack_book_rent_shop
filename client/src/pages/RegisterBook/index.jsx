import { useRef, useState } from 'react';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import empty from '../../assets/empty.jpg';
import classes from './style.module.scss';
import { doRegisterBook } from './actions';

const RegisterBook = ({ login, token, user }) => {
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
    console.log(image);
    dispatch();
    doRegisterBook(data, () => {
      navigate('/admin/dashboard');
    });
  };
  return (
    <div className={classes['main-container']}>
      <h2>
        <FormattedMessage id="registerBook" />
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
                  />
                  {/* {errors.publishAt && <span role="alert">{errors.publishAt.message}</span>} */}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.image}>
            <input type="file" name="" id="" ref={fileRef} onChange={handleFile} />
            <div onClick={() => fileRef.current.click()}>
              <img src={showImage || empty} alt="" />
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

RegisterBook.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(RegisterBook);
