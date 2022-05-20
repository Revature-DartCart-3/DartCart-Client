import React from "react";
import "./BillingForm.css";

export function Billing() {
    return (
        <>
            <div className="container p-0">
                <div className="card px-4">
                    <p className="h8 py-3">Payment Details</p>
                    <div className="row gx-3">
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Person Name</p> <input className="form-control mb-3" type="text" placeholder="Name"></input>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Card Number</p> <input className="form-control mb-3" type="text" placeholder="1234 5678 435678"></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Expiry</p> <input className="form-control mb-3" type="text" placeholder="MM/YYYY"></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">CVV/CVC</p> <input className="form-control mb-3 pt-2 " type="password" placeholder="***"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
