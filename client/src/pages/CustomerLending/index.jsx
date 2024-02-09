import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
  console.log(id);

  useEffect(() => {
    dispatch(getCustomerLending(id, () => {}));
  }, [dispatch, id]);

  console.log(customerLending);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
        <h2>
          <FormattedMessage id="customerLending" />
        </h2>
      </div>
      <div className={classes['card-container']}>
        {customerLending?.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyBook" />
          </h4>
        ) : (
          customerLending?.map((item, idx) => (
            <div key={idx} className={`${classes.card} + " " + ${item.deletedAt ? classes.deleted : null}`}>
              <Link to={`/book-detail/${item.Books?.id}`} className={classes['image-wrapper']}>
                <img src={`${config.api.image_book}${item.Books.image}`} alt="" />
              </Link>
              <div className={classes.desc}>
                <h6>{item.Books?.title}</h6>
                <div className={classes.info}>
                  <p>{item.Books?.Categories?.name}</p>
                  <span>|</span>
                  <p>{item.Books?.publishAt}</p>
                </div>
                <div className={classes.time}>
                  <div className={classes['time-wrapper']}>
                    <span>
                      <FormattedMessage id="lendDate" /> :
                    </span>
                    <p>{dayjs(item.createdAt).format('DD MMMM YYYY')}</p>
                  </div>
                  {item.deletedAt && (
                    <div className={classes['time-wrapper']}>
                      <span>
                        <FormattedMessage id="returnDate" /> :
                      </span>
                      <p>{dayjs(item.deletedAt).format('DD MMMM YYYY')}</p>
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
