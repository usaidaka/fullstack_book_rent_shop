import { selectUser } from '@containers/Client/selectors';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

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
    return;
  }
  console.log(dashboard);

  return (
    <div className={classes['main-container']}>
      <div>
        <h2>
          <FormattedMessage id="hi" /> {user.name}!
        </h2>
      </div>
      <div className={classes.container}>
        <div className={`${classes.card} + ${classes.customer}`}>
          <h1>{Object.keys(dashboard)[0]}</h1>
          <h1>{dashboard.customer}</h1>
        </div>
        <div className={`${classes.card} + ${classes.book}`}>
          <h1>{Object.keys(dashboard)[1]}</h1>
          <h1>{dashboard.book}</h1>
        </div>
        <div className={`${classes.card} + ${classes.lending}`}>
          <h1>{Object.keys(dashboard)[2]}</h1>
          <h1>{dashboard.lending}</h1>
        </div>
        <div className={`${classes.card} + ${classes.category}`}>
          <h1>{Object.keys(dashboard)[3]}</h1>
          <h1>{dashboard.category}</h1>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  dashboard: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  dashboard: selectDashboardData,
});

export default connect(mapStateToProps)(Dashboard);
