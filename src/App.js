import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toggleCartActions} from './store/UI_Layout-slice'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

let isInitial = true

const App = ()=>{
  const dispatch = useDispatch()
  const cartVisability = useSelector(state=>state.toggle.isToggled)

  // Get state of overall cart
  const cart = useSelector(state=>state.cart)
  const notification = useSelector(state=>state.toggle.notification)

  // Use useEffect to watch for chages in our cart, the useEffect will re-execute when the cart changes
  useEffect(()=>{
    const sendCartData= async()=>{
      dispatch(toggleCartActions.showNotification({
        status:"pending",
        tittle:"Sending...",
        message: "Sending cart data"
      }))
      // Sends http request to firebase database
      const response = await fetch('https://fir-react-tutorial-2b75e-default-rtdb.firebaseio.com/cart.json',{method: "PUT", body: JSON.stringify(cart)})

      if(!response.ok){
        throw new Error("Their was a error adding to cart")
      }

      dispatch(toggleCartActions.showNotification({
        status:"success",
        tittle:"Success!",
        message: "Send cart data succesfull"
      }))
    }

    // To prevent the empty cart from seding to the firebase database at the starting of the app
    if(isInitial){
      isInitial=false
      return
    }
    sendCartData().catch(error=>{
      dispatch(toggleCartActions.showNotification({
        status:"error",
        tittle:"Error!",
        message: "Thier was an error adding item to cart"
      }))
    })
  },[cart,dispatch])
  return (
    <>
    {notification && <Notification status={notification.status} title={notification.tittle} message={notification.message}/>}
    <Layout>
      {cartVisability && <Cart />}
      <Products />
    </Layout></>
  );
}

export default App;
