import { ShopProduct } from "./models";
import store from "./store";

export interface Product {
  id: number,
  name: string;
  description: string;
  imageURL: string;
}

export interface ProductReview {
  id: number,
  comment: string,
  rating: number,
  title: string,
  user: any,
  product: any
}

export interface User {
    // accountType: string;
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    registrationDate: number;
    imageURL: string;
    aboutMe: string;
}

export interface CartItem {
  id: number,
  quantity: number,
  saved: boolean,
  customer: User,
  shopProduct: ShopProduct
}

export interface OrderDetail {
  id: number;
  cost: number;
  name: string;
  description: string;
  quantity: number;
}

export interface Invoice {
  id: number;
  orderPlaced: bigint;
  shippedFrom: string;
  shippedTo: string;
  customer: User;
  shop: Shop;
  orderDetails: OrderDetail[]
}

export interface Seller {
    id: number;
    name: string;
    homepage: string;
    description: string;
    user: User;
}

export interface Shop {
    id: number;
    location: string;
    seller: Seller;
}

export interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export interface CheckoutProps {
  user: User,
  shippingAddress: string,
  currentCart: CartItem[]
}

export interface IShipping {
  id: number,
  streetAddress: string,
  city: string,
  state: string,
  zip: string
}

export interface InventoryProduct{
  id: number,
  shop_id: number,
  product_id: number,
  quantity: number,
  discount: number,
  price:number
}

export interface WishListItem {
  wishListId: number,
  customer: User,
  product: Product
}

export type RootState = ReturnType<typeof store.getState>;
export type SecurityToken = string;
export type AppDispatch = typeof store.dispatch;
