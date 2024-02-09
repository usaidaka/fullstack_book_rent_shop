import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import NightsStayIcon from '@mui/icons-material/NightsStay';
import { setLocale /*  setTheme  */ } from '@containers/App/actions';
import { selectLogin, selectUser } from '@containers/Client/selectors';
import { logout } from '@utils/logout';
import { createStructuredSelector } from 'reselect';
import config from '@config/index';
import { Button } from '@mui/material';

import classes from './style.module.scss';
import logoBook from '../../assets/logoBook.png';

const NavbarCustomer = ({ title, locale, /* theme */ login, user }) => {
  console.log(login);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const open = Boolean(menuPosition);
  const openDropdown = Boolean(dropdownPosition);

  const handleClickDropdown = (event) => {
    setDropdownPosition(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownPosition(null);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  // const handleTheme = () => {
  //   dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  // };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src={logoBook} alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.menu}>
          <div className={classes.toolbar}>
            {/* <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
              {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
            </div> */}
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
              <div className={classes.lang}>{locale}</div>
              <ExpandMoreIcon />
            </div>
          </div>
          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          {/* profile */}
          {login ? (
            <div>
              <div className={classes.toolbar}>
                <div className={classes.toggle} onClick={handleClickDropdown}>
                  <img src={`${config.api.image_customer}${user.image}`} alt="" className={classes['photo-profile']} />
                </div>
              </div>
              <Menu open={openDropdown} anchorEl={dropdownPosition} onClose={handleCloseDropdown}>
                <Link
                  to="/profile"
                  onClick={() => {
                    handleClose();
                    handleCloseDropdown();
                  }}
                >
                  <MenuItem>
                    <div className={classes.menu}>
                      <div className={classes.menuLang}>
                        <FormattedMessage id="profile" />
                      </div>
                    </div>
                  </MenuItem>
                </Link>
                <Link
                  to="/my-lending"
                  onClick={() => {
                    handleClose();
                    handleCloseDropdown();
                  }}
                >
                  <MenuItem>
                    <div className={classes.menu}>
                      <div className={classes.menuLang}>
                        <FormattedMessage id="myLending" />
                      </div>
                    </div>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  <div className={classes.menu}>
                    <div className={classes.menuLang}>
                      <FormattedMessage id="logout" />
                    </div>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button size="small" variant="contained">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
});

NavbarCustomer.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  // theme: PropTypes.string,
  login: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(NavbarCustomer);
