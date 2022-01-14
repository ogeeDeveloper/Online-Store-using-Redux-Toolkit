import {toggleCartActions} from '../../store/UI_Layout-slice'
import {useDispatch} from 'react-redux'
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const toggleCartHandler = ()=>{
    // Use the dispatch action toogle from the toggleCartActionn
    dispatch(toggleCartActions.toggle())
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
