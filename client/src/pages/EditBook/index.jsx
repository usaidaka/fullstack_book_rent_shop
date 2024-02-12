import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '@config/index';
import toast, { Toaster } from 'react-hot-toast';
import { selectCategoryList } from '@pages/Dashboard/selectors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from '@components/Loader';

import classes from './style.module.scss';
import { selectBookDetail } from './selectors';
import { doEditBook, getBookById } from './actions';

const EditBook = ({ book, categories, loadingTest = true }) => {
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

  if (render && loadingTest) {
    return <Loader isLoading={render} />;
  }
  return (
    <div data-testid="eb-main-container" className={classes['main-container']}>
      <div data-testid="eb-decoration" className={classes.decoration}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="editBook" />
        </h2>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div data-testid="eb-container" className={classes.container}>
          <div data-testid="eb-form-input" className={classes['form-input']}>
            <div data-testid="eb-main-wrapper-title-author" className={classes['main-wrapper']}>
              <div data-testid="eb-wrapper-title" className={classes.wrapper}>
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
              <div data-testid="eb-wrapper-author" className={classes.wrapper}>
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
            <div data-testid="eb-main-wrapper-synopsis-category-date" className={classes['main-wrapper']}>
              <div data-testid="eb-wrapper-synopsis" className={classes.wrapper}>
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
              <div data-testid="eb-form-select" className={classes['form-select']}>
                <div data-testid="eb-wrapper-select" className={classes.select}>
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
                <div data-testid="eb-wrapper-date" className={classes.date}>
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
          <div data-testid="eb-image" className={classes.image}>
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
  loadingTest: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  book: selectBookDetail,
  categories: selectCategoryList,
});

export default connect(mapStateToProps)(EditBook);
