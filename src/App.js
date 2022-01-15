import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';


const App = ()=>{
  const cartVisability = useSelector(state=>state.toggle.isToggled)

  // Get state of overall cart
  const cart = useSelector(state=>state.cart)

  // Use useEffect to watch for chages in our cart, the useEffect will re-execute when the cart changes
  useEffect(()=>{
    // Sends http request to firebase database
    fetch('https://fir-react-tutorial-2b75e-default-rtdb.firebaseio.com/cart.json',{method: "PUT", body: JSON.stringify(cart)})
  },[cart])
  return (
    <Layout>
      {cartVisability && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
