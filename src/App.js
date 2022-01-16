import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {sendCartData, fetchCartData} from './store/cart-action'
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

  // useEffect to fetch data from the firestore database
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  // Use useEffect to watch for chages in our cart, the useEffect will re-execute when the cart changes
  useEffect(()=>{
    if(isInitial){
      isInitial=false
      return
    }

    // Only if isChage is true ad change locally we will send the cart data
    if(cart.isChange){
      // Dispatching the sendToCart action to accept the cart as an argument
      dispatch(sendCartData(cart))
    }
    
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
