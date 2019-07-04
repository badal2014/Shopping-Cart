import products from './json/products'

export default function Filters(button) {
        return products.filter(product  => {
            for(let i=0 ; i<product.size.length ; i++){
                if(button == product.size[i]){
                    return true
                }
            }
        })
}
