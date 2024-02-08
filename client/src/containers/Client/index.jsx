import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUser } from '@containers/Client/selectors';

const Client = ({ login, children, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login || user.role !== 'Customer') {
      navigate(-1);
    }
  }, [login, navigate, user.role]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  user: PropTypes.object,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
});

export default connect(mapStateToProps)(Client);
