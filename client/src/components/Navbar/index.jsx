import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setLocale /* setTheme */ } from '@containers/App/actions';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import NightsStayIcon from '@mui/icons-material/NightsStay';
import { logout } from '@utils/logout';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import config from '@config/index';

/* ICONS */
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import logoBook from '../../assets/logoBook.png';
import classes from './style.module.scss';

const drawerWidth = 240;

const Navbar = ({ locale, /*  theme */ children, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuPosition, setMenuPosition] = useState(null);

  const open = Boolean(menuPosition);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const openDropdown = Boolean(dropdownPosition);

  const handleClickDropdown = (event) => {
    setDropdownPosition(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownPosition(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  // const handleTheme = () => {
  //   dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  // };

  const handleLogout = () => {
    logout(dispatch, navigate);
    handleCloseDropdown();
    handleClose();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Link to="/admin/book-list">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <FormattedMessage id="book" />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
      <Link to="/admin/customer-list">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <FormattedMessage id="customer" />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
      {user.role === 'Super' && (
        <Link to="/admin/admin-list">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <FormattedMessage id="admin" />
              </ListItemButton>
            </ListItem>
          </List>
        </Link>
      )}
      <Link to="/admin/lending-list">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <FormattedMessage id="lendingList" />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
      <Divider />
      <List onClick={handleLogout}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <FormattedMessage id="logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.headerWrapper}>
            <Link to="/admin/dashboard" className={classes.header}>
              <img src={logoBook} alt="" width={40} />
              <Typography variant="h6" noWrap component="div">
                <FormattedMessage id="app_title_header" />
              </Typography>
            </Link>
            <div className={classes.contentWrapper}>
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
              <div>
                <div className={classes.toolbar}>
                  <div className={classes.toggle} onClick={handleClickDropdown}>
                    <img
                      src={`${config.api.image_customer}${user.image}`}
                      alt=""
                      className={classes['photo-profile']}
                    />
                  </div>
                </div>
                <Menu open={openDropdown} anchorEl={dropdownPosition} onClose={handleCloseDropdown}>
                  <Link
                    to="/admin/profile"
                    onClick={() => {
                      handleClose();
                      handleCloseDropdown();
                    }}
                  >
                    <MenuItem>
                      <div className={classes.menu}>
                        {/* <img src={profileIcon} alt="" className={classes.icon} /> */}
                        <div className={classes.menuLang}>
                          <FormattedMessage id="profile" />
                        </div>
                      </div>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <div className={classes.menu}>
                      {/* <img src={logoutIcon} alt="" className={classes.icon} /> */}
                      <div className={classes.menuLang}>
                        <FormattedMessage id="logout" />
                      </div>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  locale: PropTypes.string.isRequired,
  // theme: PropTypes.string,
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Navbar);
