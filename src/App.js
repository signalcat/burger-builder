import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
        </Layout>
      </div>
    );
  }
}

export default App;
