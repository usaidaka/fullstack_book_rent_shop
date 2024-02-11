import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import config from '@config/index';

import { getCustomer } from './actions';
import { selectCustomerList } from './selectors';
import classes from './style.module.scss';

const Customer = ({ customers }) => {
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
    dispatch(getCustomer());
  }, [dispatch]);

  return (
    <div data-testid="customer-container" className={classes.container}>
      <div data-testid="customer-header" className={classes.header}>
        <h2>
          <FormattedMessage id="customer" />
        </h2>
        <Link to="/admin/register-customer">
          <Button variant="contained" color="primary">
            <FormattedMessage id="registerCustomer" />
          </Button>
        </Link>
      </div>
      <div data-testid="customer-card-container" className={classes['card-container']}>
        {customers.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyCustomer" />
          </h4>
        ) : (
          customers.map((item) => (
            <div key={item.id} data-testid="customer-card" className={classes.card}>
              <div data-testid="customer-image" className={classes.image}>
                <img src={`${config.api.image_customer}${item.image}`} alt="" />
              </div>
              <div data-testid="customer-data" className={classes.data}>
                <h3 data-testid="customer-name">{item.name}</h3>
                <p data-testid="customer-phone">{item.phone}</p>
                {item.address.length <= 50 ? (
                  <h5 data-testid="customer-address-lower-fifty">{item.address}</h5>
                ) : (
                  <h5 data-testid="customer-address-upper-fifty">{item.address.slice(0, 50)}</h5>
                )}
              </div>
              <div data-testid="customer-drop" className={classes.drop}>
                <div>
                  <div data-testid="customer-drop" className={classes.toolbar}>
                    <div data-testid="customer-toggle" className={classes.toggle} onClick={handleClick(item.id)}>
                      <MoreHorizIcon />
                    </div>
                  </div>
                  <Menu open={openElem === item.id} anchorEl={anchorEl} onClose={handleClose} elevation={1}>
                    <Link to={`/admin/edit-user/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1, marginTop: 1 }}>
                        <div data-testid="customer-menu-edit-user" className={classes.menu}>
                          <div data-testid="customer-menuLang-edit-user" className={classes.menuLang}>
                            <FormattedMessage id="editUser" />
                          </div>
                        </div>
                      </MenuItem>
                    </Link>
                    <Link to={`/admin/customer-lending/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1, marginTop: 1 }}>
                        <div data-testid="customer-menu-customer-lending" className={classes.menu}>
                          <div data-testid="customer-menuLang-customer-lending" className={classes.menuLang}>
                            <FormattedMessage id="customerLending" />
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

Customer.propTypes = {
  customers: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  customers: selectCustomerList,
});

export default connect(mapStateToProps)(Customer);
