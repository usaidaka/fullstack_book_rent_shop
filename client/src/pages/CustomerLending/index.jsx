import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dayjs from 'dayjs';
import config from '@config/index';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getCustomerLending } from './actions';
import classes from './style.module.scss';
import { selectCustomerLending } from './selectors';

const CustomerLending = ({ customerLending }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getCustomerLending(id, () => {
        setLoading(false);
      })
    );
  }, [dispatch, id]);

  console.log(customerLending);

  if (loading) {
    return;
  }

  return (
    <div data-testid="cl-container" className={classes.container}>
      <div data-testid="cl-header" className={classes.header}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="customerLending" />
        </h2>
      </div>
      <div data-testid="cl-card-container" className={classes['card-container']}>
        {customerLending?.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyBook" />
          </h4>
        ) : (
          customerLending?.map((item, idx) => (
            <div
              data-testid="cl-card"
              key={idx}
              className={`${classes.card} + " " + ${item.deletedAt ? classes.deleted : null}`}
            >
              <Link
                to={`/book-detail/${item.Books?.id}`}
                data-testid="cl-image-wrapper"
                className={classes['image-wrapper']}
              >
                <img src={`${config.api.image_book}${item.Books.image}`} alt="" />
              </Link>
              <div data-testid="cl-desc" className={classes.desc}>
                <h6 data-testid="cl-book-title">{item.Books?.title}</h6>
                <div data-testid="cl-info" className={classes.info}>
                  <p data-testid="cl-category-name">{item.Books?.Categories?.name}</p>
                  <span data-testid="cl-divider">|</span>
                  <p data-testid="cl-book-publishAt">{item.Books?.publishAt}</p>
                </div>
                <div data-testid="cl-time" className={classes.time}>
                  <div data-testid="cl-time-wrapper-createdAt" className={classes['time-wrapper']}>
                    <span>
                      <FormattedMessage id="lendDate" /> :
                    </span>
                    <p data-testid="cl-createdAt">{dayjs(item.createdAt).format('DD MMMM YYYY')}</p>
                  </div>
                  {item.deletedAt && (
                    <div data-testid="cl-time-wrapper-deletedAt" className={classes['time-wrapper']}>
                      <span>
                        <FormattedMessage id="returnDate" /> :
                      </span>
                      <p data-testid="cl-deletedAt">{dayjs(item.deletedAt).format('DD MMMM YYYY')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

CustomerLending.propTypes = {
  customerLending: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  customerLending: selectCustomerLending,
});

export default connect(mapStateToProps)(CustomerLending);
