
  
import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/mainLayout';
import Loader from 'utils/loader';

import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import RegisterLogin from './components/auth'

import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth } from 'store/actions/usersActions';


const Routes = (props) => {
  
  
  /// check if the user is authenticated first by validating the token stored in the cookie
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])


  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])


  return (
    <BrowserRouter>
      { loading ?
        <Loader full={true} />
        :
        <>
          <Header />
          <MainLayout>
            <Switch>
              <Route path="/sign_in" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      }


    </BrowserRouter>
  );
}

export default Routes;
