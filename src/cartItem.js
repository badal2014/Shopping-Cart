import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartTotal from './cartTotal';

export default class CartItem extends Component {
    render() {
        return (
            <div className="cartItems">
                <Link  onClick={this.props.openCart}>Back To Home</Link>
                On Cart Pager
                {this.props.cartItems === "" ? "No Items In Your cart" : ""}
                {this.props.cartItems !== undefined ? this.props.cartItems.map((data,key) => (<div><li>{data.name}{data.qty}</li><button onClick={() => this.props.increaseItem(data.id)}>ADD More</button><button onClick={() => this.props.decreaseItem(data.id)}>Decrease</button><button onClick={() => this.props.deleteItem(data.id)}>Remove</button></div> ) ): ""}
                <CartTotal cartItems={this.props.cartItems}/>
            </div>
        )
    }
}
