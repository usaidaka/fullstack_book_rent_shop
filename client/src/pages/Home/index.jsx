import { getBook } from '@pages/Book/actions';
import { selectBookList } from '@pages/Book/selectors';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import config from '@config/index';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';

import classes from './style.module.scss';
import carousel1 from '../../assets/carousel1.webp';
import carousel2 from '../../assets/carousel2.webp';
import carousel3 from '../../assets/carousel3.webp';
import carousel4 from '../../assets/carousel4.webp';
import carousel5 from '../../assets/carousel5.webp';

const Home = ({ books }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  const carouselImage = [carousel1, carousel2, carousel3, carousel4, carousel5];

  return (
    <div data-testid="home-container" className={classes.container}>
      <div data-testid="home-carousel" className={classes.carousel}>
        <Carousel>
          {carouselImage.map((item, idx) => (
            <img src={item} alt="" key={idx} />
          ))}
        </Carousel>
      </div>
      <div data-testid="home-card-container" className={classes['card-container']}>
        {books.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyBook" />
          </h4>
        ) : (
          books.map((item) => (
            <div data-testid="home-card" key={item.id} className={classes.card}>
              <div data-testid="home-title" className={classes.title}>
                {item.title.split(' ').length <= 4 ? (
                  <h5>{item.title}</h5>
                ) : (
                  <h5> {item.title.split(' ').slice(0, 4).join(' ')} </h5>
                )}
              </div>
              <Link
                to={`/book-detail/${item.id}`}
                data-testid="home-image-container"
                className={classes['image-container']}
              >
                <img
                  src={`${config.api.image_book}${item.image}`}
                  alt=""
                  data-testid="home-image"
                  className={classes.image}
                />
              </Link>
              <div data-testid="home-desc" className={classes.desc}>
                <div data-testid="home-author" className={classes.author}>
                  {item.author.split(' ').length <= 2 ? (
                    <p>{item.author}</p>
                  ) : (
                    <p> {item.author.split(' ').slice(0, 1).join(' ')}...</p>
                  )}
                </div>
                <div data-testid="home-info" className={classes.info}>
                  <h3>{item.Categories?.name}</h3>
                  <p>{item.publishAt}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  books: selectBookList,
});

export default connect(mapStateToProps)(Home);
