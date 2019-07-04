import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import CartItem from '../cartItem';

class Main extends Component {
  render() {
    return (
        <HashRouter>
          <div>
            <Switch >
              <Route exact path="/" component={App} />
              <Route exact path="/CartItem" component={CartItem} />

            </Switch >
          </div>
        </HashRouter>
    );
  }
}

export default Main;
