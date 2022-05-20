import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./wishList.css";
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
      <h2 className="wishListHeader">Your Wish List</h2>
      {
        WishListItems.map((WishListItem) => {
          return <WishListItemView key={WishListItem.wishListId} {...WishListItem} />;
        })
      }
    </>
  );
};

export default WishList;
