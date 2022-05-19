import { User } from "./types";

export class Product {
    product_id: number;
    id:     number;
    name: string;
    description: string;
    categories: string[];
    imageURL: string;

    constructor(product_id: number, id: number, name: string, description: string, categories: string[], imageURL: string) {
        this.product_id = product_id;
        this.id = id;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.imageURL = imageURL;
    }
}

export class ShopProduct {
    shop_product_id: number;
    shop: Shop;
    product: Product;
    quantity: number;
    price: number;
    location: string;
    discount: number;

    constructor(shop_product_id: number, product: Product, shop: Shop, quantity: number, price: number, location: string, discount: number) {
        this.shop_product_id = shop_product_id;
        this.shop = shop;
        this.product = product;
        this.price = price;
        this.location = location;
        this.quantity = quantity;
        this.discount = discount;
    }
}

export class Shop {
    id: number;
    location: string;
    seller: Seller;

    constructor(id: number, location: string, seller: Seller){
        this.id = id;
        this.location = location;
        this.seller = seller;
    }
}

export class Seller{
    id: number;
    name: string;
    homepage: string;
    description: string;
    user: User;

    constructor(id: number, name: string, homepage: string, description: string, user: User){
        this.id = id;
        this.name = name;
        this.homepage = homepage;
        this.description = description;
        this.user = user;
    }
}