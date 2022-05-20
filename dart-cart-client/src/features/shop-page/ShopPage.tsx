import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectShop } from "../../common/slices/authSlice";


const ShopPage = () => {

    const stateShop = useSelector(selectShop)
    const shop = JSON.parse(stateShop)
    const nav = useNavigate()
    const handleOnClick = () => {
        nav(`/shops/${shop.id}/list`)
    }

    return (
        <>
        <section className="vh-200">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-header card text-center bg-success text-white">
                                <h3 className="mb-0">Shop #</h3>
                            </div>
                            <CardGroup>
                                <Card className="text-center" style={{ width: "18rem" }}>
                                    <Card.Body>
                                        <Card.Title>{`Shop location`}</Card.Title>

                                        <Button onClick={handleOnClick} variant="success">List Item</Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )};

export default ShopPage;
