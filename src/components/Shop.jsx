import { useState, useEffect  } from "react";
import { API_KEY, API_URL } from "../config";
import {Preloader} from './Preloader'
import {GoodsList} from './GoodsList'
import {Basket} from './Basket'
import {BasketList} from './BasketList'
import { Alert } from "./Alert";


function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('')

  
  const addToBasket = (item) => {
    const itemIndex = orders.findIndex((orderItem) => orderItem.id === item.id)
    if (itemIndex < 0) {     //no such element in the basket
        const newItem = {    //create new item
            ...item,
            quantity: 1,
        }
        setOrders([...orders, newItem])    //add the item into order
        
        setTotal(total + 1)
        console.log("Total:", total)
    }
    else {                    //there is already this element in the basket
        const newOrder = orders.map((orderItem, index) => {
            if (index === itemIndex) {    //find the position of the element
              return {
                  ...orderItem,
                  quantity: Number(orderItem.quantity) + 1   //increment quantity only of the element with this position
              }             
            }
            else {
                return orderItem   //other elements remain without changes
            }
        })
        setOrders(newOrder)
    }   
    setTotal(total + 1)
    setAlertName(item.name)
  }

  const deleteItemFromOrder = (itemID) => {
    const newOrder = orders.filter(it => it.id !== itemID)
    setOrders(newOrder)
    setTotal(total - 1)
  }


  const handleBasketShow = () => {
    setBasketShow(!isBasketShow)
  }


  const handleCloseAlert = () => {
    setAlertName('')
  }

  const handleQuantityChange = (event, itemID) => {
    console.log("Selected value:", event.target.value)
    console.log("Item ID:", itemID)

    const newOrder = orders.map((el) => {
      if (el.id === itemID) {
        const newQuantity = Number(event.target.value);
        return {
          ...el,
          quantity: newQuantity
        };
      }
      else {
        return el;
      }
      
    })

    setOrders(newOrder)
    // console.log("Orders:", orders)
    const allQuantities = []
    for (let i = 0; i < orders.length; i++) {
      allQuantities.push(orders[i].quantity)
    }

    // console.log(allQuantities)
    const sumQuantities = allQuantities.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    setTotal(sumQuantities)
  }


  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
    .then((response) => response.json())
    .then((data) => {
        data.weapons && setGoods(data.weapons)
        setLoading(false)
    })
  }, []);


  return (
    <main className="container content">    
      <Basket quantity={total} handleBasketShow={handleBasketShow}  />
      { loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket} handleCloseAlert={handleCloseAlert} /> }
      { isBasketShow && <BasketList orders={orders} 
                                      handleBasketShow={handleBasketShow} 
                                      deleteItemFromOrder={deleteItemFromOrder} 
                                      handleQuantityChange={handleQuantityChange} />}
      { alertName && <Alert name={alertName} handleCloseAlert={handleCloseAlert} />}

    </main>
  )
}

export { Shop };
