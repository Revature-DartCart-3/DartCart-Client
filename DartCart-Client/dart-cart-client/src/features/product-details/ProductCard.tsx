import { ShopProduct } from "../../common/models";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface ProductCard {
  ShopProduct;
}


const ComputerUrl =
  "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

export function ProductCard({ ShopProduct }: ProductCard) {
  return (
    <div className=" card bg-black text-warning" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={ComputerUrl}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h1>{ShopProduct.product.name}</h1>
        <p className="card-text">{ShopProduct.product.description}</p>
        <Link
          className="btn stretched-link"
          to={`/shop-product/${ShopProduct.product.product_id}`}
        ></Link>
      </div>
    </div>
  );
}
