import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/About';
import StoresPage from '../pages/stores/Stores';
import WorkshopPage from '../pages/workshop/Workshop';
import LoginPage from '../pages/login/Login';
import MainLayout from '../layouts/DefaultLayout';
import SignUp from '../pages/signup/signup';
import CakeDesigner from "../pages/3D/3DHome";
import Detail from '../pages/detail/Detail';
import Dashboard from '../pages/admin/Dashboard';
import Cart from '../pages/stores/Cart';
import StorePage from '../pages/manager/StorePage';
import ListStoreAcceptDesignPage from '../pages/listStoreAcceptDesign/StoreAcceptDesignPage';
import ForgotPassword from '../pages/login/ForgotPassword';
import ResetPassword from '../pages/login/ResetPassword';
import Checkout from '../pages/stores/Checkout';
import OrderStatus from '../pages/stores/OrderStatus';
import OrderDetailStatus from '../pages/stores/OrderDetailStatus';
import Profile from '../pages/profile/Profile';
import ProductDetail from '../pages/detail/ProductDetail';
import VerifyEmail from '../pages/signup/VerifyEmail';
import ViewCustomCake from '../pages/3D/ViewCustomCake';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />


            <Route element={<MainLayout />}>

                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/workshop" element={<WorkshopPage />} />
                <Route path="/storepage" element={<StorePage />} />
                <Route path="/orderstatus" element={<OrderStatus />} />

                <Route path="/orderdetailstatus" element={<OrderDetailStatus />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/CakeDesigner/:id" element={<CakeDesigner />} />
                <Route path="/view-order-cake-design/:id" element={<ViewCustomCake />} />
                <Route path="/listStoreAcceptDesign" element={<ListStoreAcceptDesignPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
