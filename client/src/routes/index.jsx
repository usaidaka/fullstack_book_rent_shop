import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';

import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import RegisterAdmin from '@pages/RegisterAdmin';

const routes = [
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    protected: false,
    component: Home,
    layout: MainLayout,
  },

  {
    path: '/admin/register-admin',
    name: 'Register Admin',
    protected: false,
    component: RegisterAdmin,
    layout: MainLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
