import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import config from '@config/index';

import { selectLendingList } from './selectors';
import classes from './style.module.scss';
import { getLending } from './actions';

const Lending = ({ lendingList }) => {
  console.log('Tes');
  const dispatch = useDispatch();
  console.log(lendingList);
  useEffect(() => {
    dispatch(getLending());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>
          <FormattedMessage id="lendingList" />
        </h2>
        <Link to="/admin/lending">
          <Button variant="contained" color="primary">
            <FormattedMessage id="createLending" />
          </Button>
        </Link>
      </div>
      <div className={classes.card}>
        <div className={classes.mainContainer}>
          {lendingList.map((item, idx) => (
            <div key={idx} className={`${classes.cardContainer} + " " + ${item.deletedAt ? classes.deleted : null}`}>
              <div className={classes.wrapper}>
                <div className={classes['customer-data']}>
                  <div className={classes.cardLogo}>
                    <img src={`${config.api.image_customer}${item.Customers?.image}`} alt="" />
                  </div>
                  <div>
                    <p>{item.Customers?.name}</p>
                    <p>{item.Customers?.phone}</p>
                    <p>{item.Customers?.email}</p>
                  </div>
                </div>
                <div className={classes['book-data']}>
                  <div className={classes.cardLogo}>
                    <img src={`${config.api.image_book}${item.Books?.image}`} alt="" />
                  </div>
                  <p>{item.Books?.title}</p>
                  <p>{item.Books?.author}</p>
                  <p>{item.Books?.createdAt}</p>
                </div>
              </div>
              <Link to="/admin/removal-lending" className={classes.redirect}>
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
