import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

function CartScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state=>state.cart);
    const { cartItems } = cart;
    const { search } = useLocation();
    const params = useParams();
    const productId = params.id;
    const qty = search?Number(search.split('=')[1]):1;

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        navigate('/shipping');
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {
                    cartItems.length===0?<MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    :
                    (
                        <div className="row top">
      <div className="col-2">
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <link to="/">Go Shopping</link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} Items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
                <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length===0}>Procced to Checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
                    )
                }
            </div>
        </div>
    );
}

export default CartScreen;