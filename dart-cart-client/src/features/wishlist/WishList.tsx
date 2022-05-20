import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./wishListStyle.css";
import {
  fetchWishList,
  selectAllWishListItems,
  selectStatus,
} from "../../common/slices/wishlistSlice";
import WishListItemView from "./WishListItemView";
import { WishListItem } from "../../common/types";

const WishList = () => {
  const WishListItems: WishListItem[] = useSelector(selectAllWishListItems);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  useEffect(() => {
      dispatch(fetchWishList());
  }, []);

  return (
    <>
      <h2 className="wishListHeader">Your Wish List:</h2>
      <hr></hr>
      <div >
          {
            WishListItems.map((WishListItem) => {
              return <WishListItemView key={WishListItem.wishListId} {...WishListItem} />
            })
          }
      </div>
    </>
  );
}

export default WishList;
