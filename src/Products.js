import React, { Component } from 'react'
import products from './json/products' 

export default class Products extends Component {
    render() {
        return (
            <div className="col-md-12">
                {this.props.filterProducts == "" && this.props.emptyFilter != "empty" ?  products.map((data , key) => <div className="col-md-3 m-top-20" key={key}><div className="particularProduct"><div className="productImgBox"><img src={require("./assets/images/" + data.img)} alt={data.img}/></div><div className="productDescription"><h4>{data.name}</h4><h5>${data.price}</h5><button type="button" onClick={() => this.props.addToCard(data.id)}>Add To Cart</button></div></div></div>)
                :    this.props.filterProducts.map((data , key) => <div className="col-md-3 m-top-20" key={key}><div className="particularProduct"><div className="productImgBox"><img src={require("./assets/images/" + data.img)} alt={data.img}/></div><h4>{data.name}</h4><h5>${data.price}</h5><button type="button" onClick={() => this.props.addToCard(data.id)}>Add To Cart</button></div></div>)
            }
            </div>
        )
    }
}
