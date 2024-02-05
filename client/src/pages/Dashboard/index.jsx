import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Dashboard = ({ login, token, user }) => {
  console.log(login);
  console.log(token);
  console.log(user);
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

Dashboard.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(Dashboard);
