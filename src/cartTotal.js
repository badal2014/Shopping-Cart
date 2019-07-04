import React, { Component } from 'react'

export default class CartTotal extends Component {
    calculateTotal(){
        var total = 0 ;
        var itemlength = this.props.cartItems.length
        for(let i=0 ; i<itemlength;i++ ){
            let itemqty = this.props.cartItems[i].qty
            let itemprice = this.props.cartItems[i].price
            for(let j=0 ;j<itemqty ; j++){
                total = total + parseFloat(itemprice)
            }
        }
        return (total !== 0 ? `Cart Total` +total : "")
    }
    render() {
        return (
            <div>
                {this.calculateTotal()}
            </div>
        )
    }
}
