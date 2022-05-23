import {useEffect, useState} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { ShopProduct } from '../../common/models';

function AdminPage(){

    const BACKEND = process.env.REACT_APP_API_URL;

    const [products, setProducts] = useState([]);

    //retrieve all products from backend
    useEffect(()=>{
        axios.get(`${BACKEND}shop_products`)
        .then((res)=>{
            setProducts(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    //update best seller status when clicked
    function makeBestSeller(shop_product_id:number){
        console.log('BEST SELLER: item ' + shop_product_id);
    }

    //returns table of inventory with option to mark item as best seller
    return(
        <>
        <h2>Admin Portal</h2>
        <Table responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Seller</th>
                    <th>Best Seller</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item:ShopProduct)=>{
                    return(
                        <tr key={item.product.id}>
                            <td>{item.product.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.product.description}</td>
                            <td>{item.price}</td>
                            <td>{item.shop.seller.name}</td>
                            <td>
                                <button 
                                    className="btn btn-light"
                                    onClick={()=>makeBestSeller(item.shop_product_id)}>
                                        Best Seller
                                </button></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        </>
    );
}

export default AdminPage;