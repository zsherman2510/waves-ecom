import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./hoc/mainLayout";
import Loader from "utils/loader";
import AuthGuard from "./hoc/authGuard";

import { useDispatch, useSelector } from "react-redux";
import { userIsAuth, userSignOut } from "store/actions/usersActions";

import Header from "./components/navigation/header";
import Footer from "./components/navigation/footer";
import Home from "./components/home";
import RegisterLogin from "./components/auth";

import Dashboard from "./components/dashboard";
import UserInfo from "./components/dashboard/user/info";

import AdminProducts from './components/dashboard/admin/products/index';
import AddProduct from "./components/dashboard/admin/products/edit/add";
import EditProduct from "./components/dashboard/admin/products/edit/index";

const Routes = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <>
          <Header users={users} signOutUser={signOutUser} />
          <MainLayout>
            <Switch>
              <Route
                path="/dashboard/user/user_info"
                component={AuthGuard(UserInfo)}
              />
              <Route
                path="/dashboard/admin/products"
                component={AuthGuard(AdminProducts)}
              />
              <Route
                path="/dashboard/admin/add_products"
                component={AuthGuard(AddProduct)}
              />
              <Route
                path="/dashboard/admin/edit_product/:id"
                component={AuthGuard(EditProduct)}
              />
              <Route path="/dashboard" component={AuthGuard(Dashboard)} />
              <Route path="/sign_in" component={RegisterLogin} />

              <Route path="/" component={Home} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default Routes;
