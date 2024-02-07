import { useEffect, useState } from 'react';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import config from '@config/index';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { getAdmin } from './actions';
import { selectAdminList } from './selectors';
import classes from './style.module.scss';

const Admin = ({ login, token, user, admins }) => {
  const dispatch = useDispatch();
  const [openElem, setOpenElem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (elem) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenElem(elem);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenElem(null);
  };

  console.log(login);
  console.log(token);
  console.log(user);
  console.log(admins);

  useEffect(() => {
    dispatch(getAdmin(token));
  }, [dispatch, token]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>
          <FormattedMessage id="admin" />
        </h2>
        <Link to="/admin/register-admin">
          <Button variant="contained" color="primary">
            <FormattedMessage id="registerAdmin" />
          </Button>
        </Link>
      </div>
      <div className={classes['card-container']}>
        {admins.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyCustomer" />
          </h4>
        ) : (
          admins.map((item) => (
            <div key={item.id} className={classes.card}>
              <div className={classes.image}>
                <img src={`${config.api.image_customer}${item.image}`} alt="" />
              </div>
              <div className={classes.data}>
                <h3>{item.name}</h3>
                <p>{item.phone}</p>
                {item.address.length <= 50 ? <h5>{item.address}</h5> : <h5>{item.address.slice(0, 50)}</h5>}
              </div>
              <div className={classes.drop}>
                <div>
                  <div className={classes.toolbar}>
                    <div className={classes.toggle} onClick={handleClick(item.id)}>
                      <MoreHorizIcon />
                    </div>
                  </div>
                  <Menu open={openElem === item.id} anchorEl={anchorEl} onClose={handleClose} elevation={1}>
                    <Link to={`/admin/edit-user/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1, marginTop: 1 }}>
                        <div className={classes.menu}>
                          <div className={classes.menuLang}>
                            <FormattedMessage id="editUser" />
                          </div>
                        </div>
                      </MenuItem>
                    </Link>
                  </Menu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Admin.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
  admins: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  user: selectUser,
  admins: selectAdminList,
});

export default connect(mapStateToProps)(Admin);
