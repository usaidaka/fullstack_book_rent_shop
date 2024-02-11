import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import config from '@config/index';
import { getBookById } from '@pages/EditBook/actions';
import { selectBookDetail } from '@pages/EditBook/selectors';

import classes from './style.module.scss';

const BookDetail = ({ bookDetail }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  return (
    <div data-testid="book-container" className={classes.container}>
      <div data-testid="book-main-wrapper" className={classes['main-wrapper']}>
        <div data-testid="book-wrapper" className={classes.wrapper}>
          <div data-testid="book-image" className={classes.image}>
            <img data-testid="book-src" src={`${config.api.image_book}${bookDetail.image}`} alt="" />
          </div>
          <div data-testid="book-desc" className={classes.desc}>
            <h1 data-testid="book-title">{bookDetail.title}</h1>
            <div data-testid="book-mini-info" className={classes['mini-info']}>
              <h5 data-testid="book-category">{bookDetail.Categories?.name}</h5>
              <span data-testid="book-divider">|</span>
              <h5 data-testid="book-publishAt">{bookDetail.publishAt}</h5>
            </div>
            <p data-testid="book-synopsis">{bookDetail.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  bookDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  bookDetail: selectBookDetail,
});

export default connect(mapStateToProps)(BookDetail);
