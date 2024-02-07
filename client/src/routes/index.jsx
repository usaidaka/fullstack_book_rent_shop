import MainLayout from '@layouts/MainLayout';
import Admin from '@pages/Admin';
import Book from '@pages/Book';
import ChangePassword from '@pages/ChangePassword';
import Customer from '@pages/Customer';
import EditBook from '@pages/EditBook';
import EditProfileAdmin from '@pages/EditProfile';
import EditUser from '@pages/EditUser';
import Home from '@pages/Home';

import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import RegisterAdmin from '@pages/RegisterAdmin';
import RegisterBook from '@pages/RegisterBook';
import RegisterCustomer from '@pages/RegisterCustomer';

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
    path: '/admin/profile',
    name: 'Edit Profile Admin',
    protected: false,
    component: EditProfileAdmin,
    layout: MainLayout,
  },
  {
    path: '/admin/profile/change-password',
    name: 'Change Password Admin',
    protected: false,
    component: ChangePassword,
    layout: MainLayout,
  },
  /* REGISTER */
  {
    path: '/admin/register-admin',
    name: 'Register Admin',
    protected: false,
    component: RegisterAdmin,
    layout: MainLayout,
  },
  {
    path: '/admin/register-customer',
    name: 'Register Customer',
    protected: false,
    component: RegisterCustomer,
    layout: MainLayout,
  },
  {
    path: '/admin/register-book',
    name: 'Register Book',
    protected: false,
    component: RegisterBook,
    layout: MainLayout,
  },
  /* EDIT */
  {
    path: '/admin/edit-book/:id',
    name: 'Edit Book',
    protected: false,
    component: EditBook,
    layout: MainLayout,
  },
  {
    path: '/admin/edit-user/:id',
    name: 'Edit User',
    protected: false,
    component: EditUser,
    layout: MainLayout,
  },
  /* GET */
  {
    path: '/admin/book-list',
    name: 'Book List',
    protected: false,
    component: Book,
    layout: MainLayout,
  },
  {
    path: '/admin/admin-list',
    name: 'Admin List',
    protected: false,
    component: Admin,
    layout: MainLayout,
  },
  {
    path: '/admin/customer-list',
    name: 'Customer List',
    protected: false,
    component: Customer,
    layout: MainLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
