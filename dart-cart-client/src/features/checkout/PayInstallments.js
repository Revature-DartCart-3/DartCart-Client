import { useEffect, useState } from 'react';
import { selectTotal } from '../../common/slices/cartSlice';
import { useSelector } from "react-redux";
import { Form } from 'react-bootstrap';

function PayInstallments({next, back, post}) {

    const [value, setValue] = useState(1); //installment selection
    const totalPrice =  useSelector(selectTotal); //cart total
    const [instalPrice, setInstalPrice] =useState(0); //price per installment

    //calculate installment price based on selection
    useEffect(() =>{
        setInstalPrice((totalPrice/value).toFixed(2));
    },[value]); 

    // Update installment selection
    const handleChange = (event) => {
        setValue(event.target.value);
    };
 
    //TODO: save/dispatch payment plan
    function handleSubmit(e){
        e.preventDefault();
        const paymentPlan= {
            installments: value,
            price: instalPrice
        };
        post(paymentPlan);
        next();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="form-heading yellow">
                <h3>Payment Plan</h3>
            </div>

            {/* Preview payment plan details */}
            <Form.Group className="mb-3 form-group">
                <p><b>Total Price:</b> ${totalPrice}</p>
                {value < 2 ? (
                    <p>
                        {value} payment of ${instalPrice}
                    </p>
                ) : (
                    <p>
                        {value} payments of ${instalPrice}
                    </p>
                )}
            </Form.Group>

            {/* Installment Selections */}
            <Form.Group className="mb-3 form-group">
                <Form.Select
                    aria-label="Number of installments"
                    size="lg"
                    id="installment_selector"
                    className="form-select"
                    value={value}
                    onChange={handleChange}
                >
                    <option value={1}>1 Installment</option>
                    <option value={2}>2 Installments</option>
                    <option value={3}>3 Installments</option>
                    <option value={4}>4 Installments</option>
                </Form.Select>
            </Form.Group>

            {/* navigation buttons */}
            <Form.Group className="mb-3 form-group">
                <button type="button" className="button grey-button" onClick={() => back()}>Back</button>
                <button type="submit" className="button yellow-button">Next</button>
            </Form.Group>
        </Form>
    )
}

export default PayInstallments