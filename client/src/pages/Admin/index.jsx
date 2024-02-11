import { useEffect, useState } from 'react';
import { selectToken } from '@containers/Client/selectors';
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

const Admin = ({ admins }) => {
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

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  return (
    <div data-testid="admin-container" className={classes.container}>
      <div data-testid="admin-header" className={classes.header}>
        <h2>
          <FormattedMessage id="admin" />
        </h2>
        <Link to="/admin/register-admin">
          <Button variant="contained" color="primary">
            <FormattedMessage id="registerAdmin" />
          </Button>
        </Link>
      </div>
      <div data-testid="admin-card-container" className={classes['card-container']}>
        {admins.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyCustomer" />
          </h4>
        ) : (
          admins.map((item) => (
            <div key={item.id} data-testid="admin-card" className={classes.card}>
              <div data-testid="admin-image" className={classes.image}>
                <img src={`${config.api.image_customer}${item.image}`} alt="" />
              </div>
              <div data-testid="admin-data" className={classes.data}>
                <h3>{item.name}</h3>
                <p>{item.phone}</p>
                {item.address.length <= 50 ? <h5>{item.address}</h5> : <h5>{item.address.slice(0, 50)}</h5>}
              </div>
              <div data-testid="admin-drop" className={classes.drop}>
                <div>
                  <div data-testid="admin-toolbar" className={classes.toolbar}>
                    <div data-testid="admin-toggle" className={classes.toggle} onClick={handleClick(item.id)}>
                      <MoreHorizIcon />
                    </div>
                  </div>
                  <Menu open={openElem === item.id} anchorEl={anchorEl} onClose={handleClose} elevation={1}>
                    <Link to={`/admin/edit-user/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1, marginTop: 1 }}>
                        <div data-testid="admin-menu" className={classes.menu}>
                          <div data-testid="admin-menuLang" className={classes.menuLang}>
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
  admins: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  admins: selectAdminList,
});

export default connect(mapStateToProps)(Admin);
