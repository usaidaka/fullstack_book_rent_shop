import MainLayout from '@layouts/MainLayout';
import Admin from '@pages/Admin';
import Book from '@pages/Book';
import BookDetail from '@pages/BookDetail';
import ChangePasswordAdmin from '@pages/ChangePasswordAdmin';
import ChangePasswordCustomer from '@pages/ChangePasswordCustomer';
import Customer from '@pages/Customer';
import Dashboard from '@pages/Dashboard';
import DeleteLending from '@pages/DeleteLending';
import EditBook from '@pages/EditBook';
import EditProfileAdmin from '@pages/EditProfileAdmin';
import EditUser from '@pages/EditUser';
import Home from '@pages/Home';
import Lending from '@pages/LendingList';
import Login from '@pages/Login';
import MyLending from '@pages/MyLending';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import RegisterAdmin from '@pages/RegisterAdmin';
import RegisterBook from '@pages/RegisterBook';
import RegisterCustomer from '@pages/RegisterCustomer';
import RegisterLending from '@pages/RegisterLending';

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
    protected: true,
    component: Home,
    layout: MainLayout,
    role: 'Customer',
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    protected: true,
    component: Dashboard,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/profile',
    name: 'Edit Profile Admin',
    protected: true,
    component: EditProfileAdmin,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/profile/change-password',
    name: 'Change Password Admin',
    protected: true,
    component: ChangePasswordAdmin,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/profile/change-password',
    name: 'Change Password Customer',
    protected: true,
    component: ChangePasswordCustomer,
    layout: MainLayout,
    role: 'Admin',
  },
  /* REGISTER */
  {
    path: '/admin/register-admin',
    name: 'Register Admin',
    protected: true,
    component: RegisterAdmin,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/register-customer',
    name: 'Register Customer',
    protected: true,
    component: RegisterCustomer,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/register-book',
    name: 'Register Book',
    protected: true,
    component: RegisterBook,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/profile',
    name: 'Profile Customer',
    protected: true,
    component: Profile,
    layout: MainLayout,
    role: 'Customer',
  },
  /* EDIT */
  {
    path: '/admin/edit-book/:id',
    name: 'Edit Book',
    protected: true,
    component: EditBook,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/edit-user/:id',
    name: 'Edit User',
    protected: true,
    component: EditUser,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/lending',
    name: 'Create Lending',
    protected: true,
    component: RegisterLending,
    layout: MainLayout,
    role: 'Admin',
  },

  /* GET */
  {
    path: '/admin/book-list',
    name: 'Book List',
    protected: true,
    component: Book,
    layout: MainLayout,
  },
  {
    path: '/admin/admin-list',
    name: 'Admin List',
    protected: true,
    component: Admin,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/customer-list',
    name: 'Customer List',
    protected: true,
    component: Customer,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/admin/lending-list',
    name: 'Lending Book',
    protected: true,
    component: Lending,
    layout: MainLayout,
    role: 'Admin',
  },
  {
    path: '/book-detail/:id',
    name: 'Book Detail',
    protected: true,
    component: BookDetail,
    layout: MainLayout,
  },
  {
    path: '/my-lending',
    name: 'My Lending List',
    protected: true,
    component: MyLending,
    layout: MainLayout,
  },

  /* DELETE */
  {
    path: '/admin/removal-lending',
    name: 'Delete Lending',
    protected: true,
    component: DeleteLending,
    layout: MainLayout,
    role: 'Admin',
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
