import React, { Component } from 'react';
import PendingProduct from './PendingProduct/PendingProduct';
import PendingProductDetail from './PendingProductDetail/PendingProductDetail';

class PendingProducts extends Component {
    state = { 
        products : [
            {
                id : "Csfsf",
                title : "Cargos",
                desc : "shipping cargos everywhere" ,
                price : "230",
                image : "uploads\\1592674003336hockey Stick.jpg"
            },
            {
                id : "fsgs",
                title : "Bottles",
                desc : "Good Build cms Bottles" ,
                price : "230",
                image : "uploads\\1592674003336hockey Stick.jpg"
            }
        ],
        isDetail : true
    }
    render(){
        let products = null ;
        if( !this.state.isDetail ){
            products = (
                <div>
                    { this.state.products.map( product => {
                        return <PendingProduct
                            key={product.id}
                            title={product.title}
                            desc={product.desc}
                            price={product.price}
                            image={product.image} />
                    } ) }
                </div>
            )
        } else {
            products = <PendingProductDetail />
        }
        return(
            <div>
                {products}
            </div>
        )
    }
}

export default PendingProducts ;