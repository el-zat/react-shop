function BasketItem(props) {
    const {
        id,
        name,
        quantity,
        deleteItemFromOrder = Function.prototype,
        handleQuantityChange = Function.prototype,
    } = props;

    return  <li className="collection-item" >
                <div>{id} {name} x {quantity}
                    <span className="secondary-content" onClick={() => deleteItemFromOrder(id)}>
                        <i className="material-icons basket-delete-item" >clear</i>
                    </span>
                </div>                
                <br></br>
                <br></br>                   
                <select className="selectedQuantity" onChange={(event) => handleQuantityChange(event, id)}>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>                                              
                </select>
            </li>
   
}

export {BasketItem}