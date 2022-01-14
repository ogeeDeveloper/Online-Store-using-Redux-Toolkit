import {toggleCartActions} from '../../store/UI_Layout-slice'
import {useDispatch, useSelector} from 'react-redux'
import classes from './CartButton.module.css';

const CartButton = (props) => {
  // Selects Total Quanity from the cart slice
  const totalCartItemQuaity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch()
  const toggleCartHandler = ()=>{
    // Use the dispatch action toogle from the toggleCartActionn
    dispatch(toggleCartActions.toggle())
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartItemQuaity}</span>
    </button>
  );
};

export default CartButton;
