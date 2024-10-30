import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Home from './components/Home/Home.jsx';
import AddProduct from './components/Dashboard/AddProduct/AddProduct.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import PageDashBoard from './components/PageDashboard/PageDashBoard.jsx';
import Product from './components/Product/Product.jsx';
import Earbud from './components/AllCategory/Earbud.jsx';
import Camera from './components/AllCategory/Camera.jsx';
import Monitor from './components/AllCategory/Monitor.jsx';
import Speaker from './components/AllCategory/Speaker.jsx';
import Microphone from './components/AllCategory/Microphone.jsx';
import Powerbank from './components/AllCategory/Powerbank.jsx';
import Adapter from './components/AllCategory/Adapter.jsx';
import Earphone from './components/AllCategory/Earphone.jsx';
import Cover from './components/AllCategory/Cover.jsx';
import Smartwatch from './components/AllCategory/Smartwatch.jsx';
import Search from './components/Search/Search.jsx';
import Signup from './components/SIgnup/Signup.jsx';
import { LogIn } from 'lucide-react';
import AuthProvider from './components/provider/AuthProvider.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Cart from './components/Cart/Cart.jsx';
import WishList from './components/WishList/WishList.jsx';
import ManageUser from './components/Dashboard/ManageUser/ManageUser.jsx';
import ManageProduct from './components/Dashboard/ManageProduct/ManageProduct.jsx';
import ManageOrder from './components/Dashboard/ManageOrder/ManageOrder.jsx';
import UpdateProduct from './components/Dashboard/UpdateProduct/UpdateProduct.jsx';
import PrivateRoute from './components/Routes/PrivateRoute.jsx';
import AdminRoute from './components/Routes/AdminRoute.jsx';
import CheckOut from './components/CheckOut/CheckOut.jsx';
import Payment from './components/Payment/Payment.jsx';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess.jsx';
import OrderDetails from './components/OrderDetails/OrderDetails.jsx';
import MyOrder from './components/MyOrder/MyOrder.jsx';
import Notification from './components/Notification/Notification.jsx';
import Blog from './components/Blog.jsx';
import About from './components/About.jsx';
import DeliveryDetails from './components/DeliveryDetails.jsx';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import ShippingPolicy from './components/ShippingPolicy.jsx';
import Profile from './components/Profile/Profile.jsx';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/search', element: <Search /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: '/product/:id', element: <ProductDetails /> },
      {
        element: <PageDashBoard />,
        children: [
          { path: '/shop', element: <Product /> },
          { path: '/smartwatch', element: <Smartwatch /> },
          { path: '/earbud', element: <Earbud /> },
          { path: '/cover', element: <Cover /> },
          { path: '/earphone', element: <Earphone /> },
          { path: '/adapter', element: <Adapter /> },
          { path: '/powerbank', element: <Powerbank /> },
          { path: '/microphone', element: <Microphone /> },
          { path: '/speaker', element: <Speaker /> },
          { path: '/monitor', element: <Monitor /> },
          { path: '/camera', element: <Camera /> },
        ]
      },
      { path: '/cart', element: <PrivateRoute><Cart /></PrivateRoute> },
      { path: '/wishlist', element: <PrivateRoute><WishList /></PrivateRoute> },
      { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/add-product', element: <PrivateRoute><AdminRoute><AddProduct /></AdminRoute></PrivateRoute> },
      { path: '/manage-user', element: <PrivateRoute><AdminRoute><ManageUser /></AdminRoute></PrivateRoute> },
      { path: '/manage-product', element: <PrivateRoute><AdminRoute><ManageProduct /></AdminRoute></PrivateRoute> },
      { path: '/manage-order', element: <PrivateRoute><AdminRoute><ManageOrder /></AdminRoute></PrivateRoute> },
      { path: '/update/:id', element: <PrivateRoute><AdminRoute><UpdateProduct /></AdminRoute></PrivateRoute> },
      { path: '/checkout', element: <PrivateRoute><CheckOut /></PrivateRoute> },
      { path: '/payment', element: <PrivateRoute><Elements stripe={stripePromise}><Payment /></Elements></PrivateRoute> },
      { path: '/payment-success', element: <PrivateRoute><Elements stripe={stripePromise}><PaymentSuccess /></Elements></PrivateRoute> },
      { path: '/payment/:tnxID', element: <PrivateRoute><AdminRoute><Elements stripe={stripePromise}><OrderDetails /></Elements></AdminRoute></PrivateRoute> },
      { path: '/orders', element: <PrivateRoute><MyOrder /></PrivateRoute> },
      { path: '/notifications', element: <PrivateRoute><Notification /></PrivateRoute> },
      {
        path: '/blog',
        element: <Blog/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/delivery-details',
        element: <DeliveryDetails/>
      },
      {
        path: '/terms',
        element: <TermsAndConditions/>
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy/>
      },
      {
        path: '/shipping-policy',
        element: <ShippingPolicy/>
      },
      {
        path: '/profile',
        element: <Profile/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
