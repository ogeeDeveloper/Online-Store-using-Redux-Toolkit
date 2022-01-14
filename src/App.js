import { useSelector } from 'react-redux'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';


const App = ()=>{
  const cartVisability = useSelector(state=>state.toggle.isToggled)
  return (
    <Layout>
      {!cartVisability && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
