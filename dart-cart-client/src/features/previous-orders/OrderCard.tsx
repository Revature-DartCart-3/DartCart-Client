
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrderDetail } from "../../common/types";

interface IDetails {
    detail: OrderDetail;
}
const ComputerUrl =
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

function OrderCard({ detail }: IDetails) {
    return (
        <>
            <div key={'Detail: ' + detail.id} className=" card bg-black text-warning" style={{ width: "18rem" }}>
                <img
                    className="card-img-top"
                    src={ComputerUrl}
                    alt="Card image cap"
                ></img>
                <div className="card-body">
                    <h1>{detail.name}</h1>
                    <h4>Quantity: {detail.quantity}</h4>
                    <h4>Total: ${(detail.cost / 100)}{(detail.cost % 100 ? "" : ".0")}{(detail.cost % 10 ? "" : "0")}</h4>
                    <p className="card-text">{`${detail.description}`}</p>

                </div>
            </div>
        </>
    );
}

export default OrderCard
