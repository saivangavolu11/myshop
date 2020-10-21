import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import OrderDetail from './OrderDetails';
import OrderSummary from './OrderSummary';
import fetch from './fetch';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/orderDetails/:id">
            <OrderDetail/>
          </Route>
          <Route path="/orderSummary">
            <OrderSummary />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
