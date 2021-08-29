import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Header from './components/navigation/header'
import Footer from './components/navigation/footer'
import Home from './components/home'
import MainLayout from './hoc/mainLayout'
import RegisterLogin from './components/auth'
function Routes() {
  return (
    <BrowserRouter>
    <Header/>
    <MainLayout>
      <Switch>
        <Route path='/sign_in' component={RegisterLogin}/>
        <Route path="/" component={Home} />
      </Switch>
      
    </MainLayout>
      <Footer/>
    </BrowserRouter>
  );
}

export default Routes;
