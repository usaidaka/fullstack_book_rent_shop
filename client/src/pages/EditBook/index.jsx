import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import config from '@config/index';
import toast, { Toaster } from 'react-hot-toast';
import { selectCategoryList } from '@pages/Dashboard/selectors';

import classes from './style.module.scss';
import { selectBookDetail } from './selectors';
import { doEditBook, getBookById } from './actions';

const EditBook = ({ book, categories }) => {
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    dispatch(
      getBookById(id, () => {
        setRender(false);
      })
    );
  }, [dispatch, id]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('idCategory', data.idCategory);
    formData.append('publishAt', data.publishAt.split('-')[0]);
    formData.append('synopsis', data.synopsis);
    dispatch(
      doEditBook(formData, id, (message) => {
        toast.success(message, { duration: 1000 });
        setTimeout(() => navigate('/admin/book-list'), 2000);
        setLoading(true);
      })
    );
  };

  if (render) {
    return;
  }
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
                    optional: 'title is optional',
                  })}
                  aria-invalid={errors.title ? 'true' : 'false'}
                  defaultValue={book.title}
                />
                {errors.title && <span role="alert">{errors.title.message}</span>}
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
                    optional: 'author is optional',
                  })}
                  aria-invalid={errors.author ? 'true' : 'false'}
                  defaultValue={book.author}
                />
                {errors.author && <span role="alert">{errors.author.message}</span>}
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
                    optional: 'synopsis is optional',
                  })}
                  aria-invalid={errors.author ? 'true' : 'false'}
                  defaultValue={book.synopsis}
                />
                {errors.synopsis && <span role="alert">{errors.synopsis.message}</span>}
              </div>
              <div className={classes['form-select']}>
                <div className={classes.select}>
                  <label htmlFor="">
                    <FormattedMessage id="category" />
                  </label>
                  <select
                    id="idCategory"
                    name="idCategory"
                    placeholder="idCategory"
                    {...register('idCategory', {
                      optional: 'Category is optional',
                    })}
                    aria-invalid={errors.idCategory ? 'true' : 'false'}
                  >
                    <option id="idCategory" value="">
                      Select Option
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {errors.idCategory && <span role="alert">{errors.idCategory.message}</span>}
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
                      optional: 'publishAt is optional',
                    })}
                    aria-invalid={errors.publishAt ? 'true' : 'false'}
                    max={new Date().toISOString().split('T')[0]}
                    defaultChecked={book.publishAt}
                  />
                  {errors.publishAt && <span role="alert">{errors.publishAt.message}</span>}
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
        <Button variant="contained" type="submit" disabled={loading}>
          submit
        </Button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

EditBook.propTypes = {
  book: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  book: selectBookDetail,
  categories: selectCategoryList,
});

export default connect(mapStateToProps)(EditBook);
