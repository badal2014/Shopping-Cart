import React, { Component } from 'react'
import './index.scss';
import Products from './Products';
import ProductsJson from './json/products'
import CartItem from './cartItem';
import Filters from './filters';
import OrderBy from './orderBy';

const availableSize = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productJson: ProductsJson,
      cartItem: [],
      openCart: false,
      filterProducts: "",
      emptyFilter: "",
      orderBy: ""
    }
  }
  addToCard(id) {
    var id2 = id;
    var count = 0;
    var cartItem = this.state.cartItem
    this.state.cartItem.push(this.state.productJson[id])
    for (let i = 0; i < this.state.cartItem.length; i++) {
      if (this.state.cartItem[i].id === id2) {
        console.log(this.state.cartItem);
        cartItem[i].qty =1
        this.setState({
          cartItem
        })
        // this.state.cartItem[i].qty = 1        
        count = count + 1
        if (count > 1) {
          this.state.cartItem.pop()
          count = 0
        }
      }
      this.setState({ cartItem: this.state.cartItem })
    }
  }
  openCart() {
    this.setState({ openCart: !this.state.openCart })
  }
  increaseItem(id) {
    const { cartItem } = this.state
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id === id) {
        cartItem[i].qty += 1
      }
    }
    this.setState({ cartItem })
  }
  decreaseItem(id) {
    const { cartItem } = this.state
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id === id && cartItem[i].qty > 1) {
        cartItem[i].qty -= 1
      }
    }
    this.setState({ cartItem: this.state.cartItem })
  }
  deleteItem(id) {
    var x = this.state.cartItem.filter((data) => { return data.id !== id })
    this.setState({
      cartItem: x
    })
  }
  myFunction = (e) => {
    let selectedSizes = []
    let filters = []
    let checkbox = document.getElementsByClassName("sizeCheckBox")
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        selectedSizes.push(checkbox[i].id)
      }
    }
    for (let j = 0; j < selectedSizes.length; j++) {
      if (document.getElementById(selectedSizes[j]).checked) {
        filters.push(Filters(selectedSizes[j]))
      }
      else {
        this.setState({ filterProducts: Filters("") })
      }
    }
    let finalArray = []
    let lastFinal = [], item
    for (let k = 0; k < filters.length; k++) {
      item = filters[k]
      for (let b = 0; b < item.length; b++) {
        finalArray.push(item[b]);
      }
    }
    let count = 0
    let unique = [...new Set(finalArray)]
    for (let z = 0; z < unique.length; z++) {
      if (selectedSizes.length > 1) {
        if (selectedSizes.some(r => unique[1].size.indexOf(r) >= 0)) {
          lastFinal.push(unique[z])
        }
      } else {
        lastFinal.push(unique[z])
      }
    }
    if (lastFinal === "") {
      this.setState({ emptyFilter: "empty" })
    } else {
      this.setState({ emptyFilter: "", filterProducts: Filters("") })
    }
    this.setState({ filterProducts: lastFinal })
    for (let m = 0; m < checkbox.length; m++) {
      if (checkbox[m].checked) { count = count + 1 }
    }
    if (count === 0) {
      this.setState({ emptyFilter: "", filterProducts: Filters("") })
    }
  }
  createCheckboxes = () => availableSize.map((label, key) => { return <div className="checkBoxMain" key={key}><input type="checkbox" id={label} className="sizeCheckBox" onClick={(e) => this.myFunction(e)} name={label} /><label className="checkmark" htmlFor={label}>{label}</label></div> })
  orderBy(e) {
    let value = e.target.value
    if (value === "low") {
      this.low()
      // this.setState({ orderBy: value })
    } else if (value === "high") {
      this.high()
      // this.setState({ orderBy: value })
    }
    else if (value === "") {
      this.setState({
        filterProducts: Filters(this.state.productJson)
      })
    }
  }
  low() {
    let arrayCopy = []
    for(let k=0 ; k< ProductsJson.length ; k++){
      arrayCopy[k] = ProductsJson[k]
    }
    for (let i = 1; i < arrayCopy.length; i++) {
      for (let j = 0; j < i; j++) {
        if (parseFloat(arrayCopy[i].price) < parseFloat(arrayCopy[j].price)) {
          let swap = arrayCopy[i];
          arrayCopy[i] = arrayCopy[j];
          arrayCopy[j] = swap
        }
      }
    }
    this.setState({
      filterProducts: arrayCopy
    })
  }
  high() {
    let arrayCopy = []
    for(let k=0 ; k< ProductsJson.length ; k++){
      arrayCopy[k] = ProductsJson[k]
    }
    for (let i = 1; i < arrayCopy.length; i++) {
      for (let j = 0; j < i; j++) {
        if (parseFloat(arrayCopy[i].price) > parseFloat(arrayCopy[j].price)) {
          let swap = arrayCopy[i];
          arrayCopy[i] = arrayCopy[j];
          arrayCopy[j] = swap
        }
      }
    }
    this.setState({
      filterProducts: arrayCopy
    })
  }

  render() {
    return (
      <div className="container shoppingCart">
        <div className="header"></div>
        <div className="col-md-6">
          <button type="button" onClick={() => this.setState({ openCart: !this.state.openCart })}>Go To Cart</button>
        </div>
        <div className="col-md-6">
          <OrderBy orderBy={(e) => this.orderBy(e)} />
        </div>
        {/* <h1>Items In Cart{this.state.cartItem.length}</h1> */}
        <div className="ItemsInCart">
          {this.state.cartItem.map((data, key) => (<div key={key}>{data.Name}</div>))}
        </div>
        <div className="col-md-12">
          <div className="col-md-2 pad-0">
            <div className="filters">
              {this.createCheckboxes()}
            </div>
          </div>
          <div className="col-md-10 products">
            <Products addToCard={(id) => this.addToCard(id)} filterProducts={this.state.filterProducts} emptyFilter={this.state.emptyFilter} />
          </div>
        </div>
        {this.state.openCart ? <CartItem openCart={() => this.openCart()} cartItems={this.state.cartItem} increaseItem={(id) => this.increaseItem(id)} decreaseItem={(id) => this.decreaseItem(id)} deleteItem={(id) => { this.deleteItem(id) }} /> : null}
      </div>
    )
  }
}