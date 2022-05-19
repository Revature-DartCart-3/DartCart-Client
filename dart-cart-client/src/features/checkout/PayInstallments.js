import React, { useEffect, useState } from 'react'

function PayInstallments() {
    const [value, setValue] = useState(1)
    const totalPrice = 3000;
    const [instalPrice, setInstalPrice] =useState(3000);
    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value)
      };
    useEffect(() =>{
     setInstalPrice(totalPrice/value);
    },[value]); 

      

    
  return (
    <>
            <div className="container p-0">
                <div className="card px-4">
                    <p className="h8 py-3">Payment Plan</p>
                    <div className="row gx-3">
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Installments</p> 
                                <select className="form-control mb-3" value={value} onChange={handleChange} >
                                    <option value={1}>1 Installment</option>
                                    <option value={2}>2 Installments</option>
                                    <option value={3}>3 Installments</option>
                                    <option value={4}>4 Installments</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Total Price: ${totalPrice}</p>
                                {value < 2 ? (
                                    <p className="text mb-1">
                                    {value} payment of ${instalPrice}
                                    </p> 
                                ):(
                                    <p className="text mb-1">
                                    {value} payments of ${instalPrice}
                                    </p>  
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default PayInstallments