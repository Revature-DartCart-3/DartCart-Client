import {useRef, useState} from 'react'
import { Overlay, Tooltip } from 'react-bootstrap';
import { AiOutlineCheck } from 'react-icons/ai';
import authHeader from "../authentication/AuthHeader";
import axios from "axios";

export default function WishlistButton({product}){

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const MOCK_SERVER = process.env.REACT_APP_API_URL;

    function addToWishList(productId) {
        return axios.post(`${MOCK_SERVER}addToWishList`, {
            productId: productId
        },
            { headers: authHeader() }
        ).then(response => {
            // return "Item added to wishlist!"
            return true;
        }).catch((error) => {
            // if (error.response!.status === 409) {
            //     return "Item already exists in wishlist!"
            // }
            // return "Cannot add to wishlist";
            return false;
        })
    }

    async function addToWL(productId) {
        const y = await addToWishList(productId);
        // return React.createElement("span", { class: "wishListNotice  youCanSeeMe" }, y);
        return y;
    }

    return(<>
        <button ref={target} id="addToWishList" className="review-link addToWishList"
            onClick={() => {
                addToWL(product?.id);
                setShow(true);
                setTimeout(() => { setShow(false) }, 2000);
            }}
        >
            Add to Wishlist
        </button>
        <Overlay
            target={target.current}
            show={show}
            placement="right">
          <Tooltip id={`tooltip${product?.id}`}><AiOutlineCheck/></Tooltip>
        </Overlay>
    </>);
}