import { BasketItem } from './BasketItem'


function BasketList(props) {
    const {orders = [], 
        handleBasketShow = Function.prototype, 
        deleteItemFromOrder=Function.prototype,
        handleQuantityChange=Function.prototype} 
        = props;

        // console.log(orders)
        // console.log(orders.length)
    

    return <ul className="collection basket-list">
                <li className="collection-item active">Basket</li>  
                {orders.length ? (orders.map((item) => <BasketItem key={item.id} 
                                                                    deleteItemFromOrder={deleteItemFromOrder} 
                                                                    handleQuantityChange={handleQuantityChange} 
                                                                    {...item} />))
                 : (<li className='collection-item'>Basket is empty</li>)
                }
                <li className='material-icons basket-close' onClick={handleBasketShow}>close</li>         
                <button type="button" className='place btn btn-small'>Place order</button>    
            </ul>
            
}

export {BasketList}
