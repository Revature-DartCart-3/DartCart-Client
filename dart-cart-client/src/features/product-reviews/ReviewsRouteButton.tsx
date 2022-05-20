import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';



function ReviewsRouteButton() {
    return (
        <Link to="/product-review/1" className="text-reset nav-link">
            View reviews for this product
        </Link>
    )
}

export default ReviewsRouteButton