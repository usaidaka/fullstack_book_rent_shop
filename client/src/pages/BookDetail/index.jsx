import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import { selectBookList } from '@pages/Book/selectors';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import config from '@config/index';
import { getBookById } from '@pages/EditBook/actions';
import { selectBookDetail } from '@pages/EditBook/selectors';

import classes from './style.module.scss';

const BookDetail = ({ login, token, user, books, bookDetail }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(login);
  console.log(token);
  console.log(user);
  console.log(bookDetail);

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  console.log(books);

  return (
    <div className={classes.container}>
      <div className={classes['main-wrapper']}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <img src={`${config.api.image_book}${bookDetail.image}`} alt="" />
          </div>
          <div className={classes.desc}>
            <h1>{bookDetail.title}</h1>
            <div className={classes['mini-info']}>
              <h5>{bookDetail.Categories?.name}</h5>
              <span>|</span>
              <h5>{bookDetail.publishAt}</h5>
            </div>
            <p>{bookDetail.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
  books: PropTypes.array,
  bookDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
  books: selectBookList,
  bookDetail: selectBookDetail,
});

export default connect(mapStateToProps)(BookDetail);
