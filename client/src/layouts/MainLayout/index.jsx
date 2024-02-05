import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import { selectUser } from '@containers/Client/selectors';
import NavbarCustomer from '@components/NavbarCustomer';

const MainLayout = ({ children, locale, theme, intl: { formatMessage }, user }) => {
  let renderNav;
  switch (user.role) {
    case 'Super':
    case 'Admin':
      renderNav = (
        <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme}>
          {children}
        </Navbar>
      );
      break;
    case 'Customer':
      renderNav = (
        <NavbarCustomer title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme}>
          {children}
        </NavbarCustomer>
      );
      break;
    default:
      renderNav = (
        <NavbarCustomer title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme}>
          {children}
        </NavbarCustomer>
      );
      break;
  }
  return <div>{renderNav}</div>;
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  user: selectUser,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  user: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
