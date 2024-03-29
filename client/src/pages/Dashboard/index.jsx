import { selectUser } from '@containers/Client/selectors';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Loader from '@components/Loader';

import { getCategoryList, getDashboard } from './actions';
import classes from './style.module.scss';
import { selectDashboardData } from './selectors';

const Dashboard = ({ user, dashboard }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getCategoryList(() => {
        setLoading(false);
      })
    );
    dispatch(
      getDashboard(() => {
        setLoading(false);
      })
    );
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <div data-testid="dashboard-main-container" className={classes['main-container']}>
      <div>
        <h2>
          <FormattedMessage id="hi" /> {user.name}!
        </h2>
      </div>
      <div data-testid="dashboard-container" className={classes.container}>
        <div data-testid="dashboard-card-customer" className={`${classes.card} + ${classes.customer}`}>
          <h1>
            <FormattedMessage id="customer" />
          </h1>
          <h1>{dashboard.customer}</h1>
        </div>
        <div data-testid="dashboard-card-book" className={`${classes.card} + ${classes.book}`}>
          <h1>
            <FormattedMessage id="book" />
          </h1>

          <h1>{dashboard.book}</h1>
        </div>
        <div data-testid="dashboard-card-lending" className={`${classes.card} + ${classes.lending}`}>
          <h1>
            <FormattedMessage id="lendingList" />
          </h1>
          <h1>{dashboard.lending}</h1>
        </div>
        <div data-testid="dashboard-card-category" className={`${classes.card} + ${classes.category}`}>
          <h1>
            <FormattedMessage id="category" />
          </h1>
          <h1>{dashboard.category}</h1>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  dashboard: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  dashboard: selectDashboardData,
});

export default connect(mapStateToProps)(Dashboard);
