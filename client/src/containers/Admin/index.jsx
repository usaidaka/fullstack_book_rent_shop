import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUser } from '@containers/Client/selectors';

const Admin = ({ login, children, user }) => {
  const navigate = useNavigate();

  const isAdmin = !login && (user.role !== 'Admin' || user.role !== 'Super');

  useEffect(() => {
    if (isAdmin) {
      navigate(-1);
    }
  }, [isAdmin, login, navigate, user.role]);

  return children;
};

Admin.propTypes = {
  login: PropTypes.bool,
  user: PropTypes.object,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
});

export default connect(mapStateToProps)(Admin);
