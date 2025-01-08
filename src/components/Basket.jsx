function Basket(props) {
    const{quantity = 0, handleBasketShow = Function.prototype} = props


    return (
        <div className="basket blue darken-4 white-text" onClick={handleBasketShow}>
            <i className="material-icons">shopping_cart</i>
            {quantity ? (<span className="basket-quantity">{quantity}</span>) : 0 }            
        </div>

        
    )
}

export {Basket}