import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../common/types"
import { WishListItem } from "../../common/types";
import { selectWishListItemById, fetchWishList, deleteFromWishList } from "../../common/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { TrashFill} from "react-bootstrap-icons";

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
                <img className="productImg" alt='' src={ item?.product.imageURL }/>
                <section className="wishListBody">
                    <h5 className="productName">{item?.product.name}</h5>
                    <hr></hr>
                    <Link to={`/shop-product/${ item?.product.id }`} className="viewProductBtn">View Product</Link>
                    <div  onClick={() => sendDelete(item?.product.id)} >
                        <TrashFill className="removeWishBtn" size={35} />
                    </div>
                </section>
            </div>
        </>
    );

}

export default WishListItemView;
