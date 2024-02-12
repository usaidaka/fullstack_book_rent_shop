import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import config from '@config/index';
import Loader from '@components/Loader';

import { selectLendingList } from './selectors';
import classes from './style.module.scss';
import { getLending } from './actions';

const Lending = ({ lendingList }) => {
  console.log('Tes');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log(lendingList);
  useEffect(() => {
    dispatch(
      getLending(() => {
        setLoading(false);
      })
    );
  }, [dispatch]);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <div data-testid="lending-container" className={classes.container}>
      <div data-testid="lending-header" className={classes.header}>
        <h2>
          <FormattedMessage id="lendingList" />
        </h2>
        <Link to="/admin/lending">
          <Button variant="contained" color="primary">
            <FormattedMessage id="createLending" />
          </Button>
        </Link>
      </div>
      <div data-testid="lending-card" className={classes.card}>
        <div data-testid="lending-mainContainer" className={classes.mainContainer}>
          {lendingList?.map((item, idx) => (
            <div
              data-testid="lending-cardContainer"
              key={idx}
              className={`${classes.cardContainer} + " " + ${item.deletedAt ? classes.deleted : null}`}
            >
              <div data-testid="lending-wrapper" className={classes.wrapper}>
                <div data-testid="lending-customer-data" className={classes['customer-data']}>
                  <div data-testid="lending-cardLogo-customer" className={classes.cardLogo}>
                    <img src={`${config.api.image_customer}${item.Customers?.image}`} alt="" />
                  </div>
                  <div>
                    <p>{item.Customers?.name}</p>
                    <p>{item.Customers?.phone}</p>
                    <p>{item.Customers?.email}</p>
                  </div>
                </div>
                <div data-testid="lending-book-data" className={classes['book-data']}>
                  <div data-testid="lending-cardLogo-book" className={classes.cardLogo}>
                    <img src={`${config.api.image_book}${item.Books?.image}`} alt="" />
                  </div>
                  <p>{item.Books?.title}</p>
                  <p>{item.Books?.author}</p>
                  <p>{item.Books?.createdAt}</p>
                </div>
              </div>
              <Link
                to="/admin/removal-lending"
                data-testid="lending-redirect"
                className={`${classes.redirect} + " " + ${item.deleted ? classes.deleted : null}`}
              >
                <Button size="small" variant="contained" color="error" disabled={item.deletedAt}>
                  {item.deletedAt ? 'Deleted' : 'Delete'}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Lending.propTypes = {
  lendingList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  lendingList: selectLendingList,
});

export default connect(mapStateToProps)(Lending);
