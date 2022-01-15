import {toggleCartActions} from './UI_Layout-slice'
import {cartActions} from './cart-slice'

// Fetch card data from the firebase database
export const fetchCartData=()=>{
    return async dispatch=>{
        const fetchData=async() =>{
            const response = await fetch('https://fir-react-tutorial-2b75e-default-rtdb.firebaseio.com/cart.json')

            if(!response.ok){
                return new Error("Teir was an error fetching data")
            }

            const data = response.json()
            return data
        }

        try{
            // Asign the fetch data to the cartData variable
            const cartData = await fetchData()
            // dispatch the action to replace items inn cart and display them when even the page refreshes
            dispatch(cartActions.replaceCart(cartData))
        }catch(error){
            dispatch(toggleCartActions.showNotification({
                status:"error",
                tittle:"Error!",
                message: "Thier was an error fetching data from cart"
              }))
        }
    }
}

//Action Creator Thunk function to add item to card
// Dispatching a fuction that takes in another fuction
export const sendCartData=cart=>{
    return async(dispatch) =>{
        dispatch(toggleCartActions.showNotification({
            status:"pending",
            tittle:"Sending...",
            message: "Sending cart data"
          }))
        
        const sendResponse= async() => {
            // Sends http request to firebase database
            const response = await fetch('https://fir-react-tutorial-2b75e-default-rtdb.firebaseio.com/cart.json',{method: "PUT", body: JSON.stringify(cart)})

            if(!response.ok){
                throw new Error("Their was a error adding to cart")
            }
         }

         try{
             // Send Response
            await sendResponse()

            // Show a success notification
            dispatch(toggleCartActions.showNotification({
                status:"success",
                tittle:"Success!",
                message: "Send cart data succesfull"
              }))
         }catch(error){
            dispatch(toggleCartActions.showNotification({
                status:"error",
                tittle:"Error!",
                message: "Thier was an error adding item to cart"
              }))
         }
    }
}