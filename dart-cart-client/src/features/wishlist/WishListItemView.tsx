import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../common/types"
import { WishListItem } from "../../common/types";
import { selectWishListItemById, fetchWishList, deleteFromWishList } from "../../common/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { TrashFill, BagPlusFill } from "react-bootstrap-icons";
import "./wishListStyle.css";




const WishListItemView = ({ wishListId }: WishListItem) => {

    const dispatch = useDispatch();
    const item = useSelector((state: RootState) => selectWishListItemById(state, wishListId));

    const sendDelete = async (productId) => {
        await dispatch(deleteFromWishList(productId));
        dispatch(fetchWishList());
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
              <BagPlusFill className='addCartBtn' size={45} />
            </div>
          </section>
        </div>
      </>
    )

}

export default WishListItemView;
