import { useState, useRef } from 'react';
import { addToCart } from "../../common/slices/cartSlice";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../common/types"
import { WishListItem } from "../../common/types";
import { selectWishListItemById, fetchWishList, deleteFromWishList } from "../../common/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { TrashFill, BagPlusFill } from "react-bootstrap-icons";
import { AiOutlineCheck } from 'react-icons/ai';
import {Overlay, Tooltip} from 'react-bootstrap';
import "./wishListStyle.css";




const WishListItemView = ({ wishListId }: WishListItem) => {

  const dispatch = useDispatch();
  const item = useSelector((state: RootState) => selectWishListItemById(state, wishListId));
  const [showCart, setShowCart] = useState(false);
  const cart_target = useRef(null);

  const sendDelete = async (productId) => {
      await dispatch(deleteFromWishList(productId));
      dispatch(fetchWishList());
  }
  function handleAddtoCart(id) {
    dispatch(addToCart(id));
  }

  return (
    <>
      <div className="productContainer">
        <img alt='' className="productImg" src={item?.product.imageURL} />
        <section className="wishListBody">
          <h5 className="productName">{item?.product.name} </h5>
          <hr></hr>
          <Link
            to={`/shop-product/${item?.product.id}`}
            className="viewProductBtn"
          >
            View Product...
          </Link>
          <hr></hr>
          <div>
            <TrashFill className="removeWishBtn" size={45} onClick={() => sendDelete(item?.product.id)} />
            <button 
              className="addCart"
              ref={cart_target}
              onClick={() => {
                setShowCart(!showCart);
                setTimeout(() => { setShowCart(false) }, 2000);
                handleAddtoCart(item?.product.id);
              }}>
              <BagPlusFill className='addCartBtn' size={45}/>
            </button>

            {/* Tootlip for successful addition to cart */}
            <Overlay
              target={cart_target.current}
              show={showCart}
              placement="right">
              <Tooltip id={`tooltip${item?.product.id}`}><AiOutlineCheck /></Tooltip>
            </Overlay>
          </div>
        </section>
      </div>
    </>
  )

}

export default WishListItemView;
