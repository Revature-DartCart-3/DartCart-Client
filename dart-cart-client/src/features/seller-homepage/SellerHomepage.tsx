import React, { useEffect, useRef } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { fetchShop, selectSeller, selectShop, selectUser, updateUser } from "../../common/slices/authSlice";

export const SellerHomepage = () => {
    const dispatch = useAppDispatch();
    const stateSeller = useSelector(selectSeller);
    const seller = JSON.parse(stateSeller || "");
    const stateShop = useSelector(selectShop);
    const shop = JSON.parse(stateShop);
    const nav = useNavigate();

    useEffect(() => {
        dispatch(fetchShop(seller[0].id));
    }, []);

    const handleOnClick = () => {
        nav(`/shops/${shop.id}`);
    };

    return (
        <>
            <section className="vh-200">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-header card text-center bg-success text-white">
                                    <h3 className="mb-0">Your Shops</h3>
                                </div>
                                <CardGroup>
                                    <Card className="text-center" style={{ width: "18rem" }}>
                                        <Card.Body>
                                            <Card.Title>{`Shop #${shop?.id ?? ""}`}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {shop?.location ?? ""}
                                            </Card.Subtitle>
                                            <Button onClick={handleOnClick}>GO</Button>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SellerHomepage;
