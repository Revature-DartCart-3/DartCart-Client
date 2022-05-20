import logo from '../../logo.svg';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../common/slices/authSlice"
import { selectGetByShopStatus, getInvoicesByShop, selectInvoices, resetState, clearInvoices } from "../../common/slices/invoiceSlice"
import { useNavigate } from 'react-router-dom';
import Error404Page from '../../components/Error';
import OrderCard from './OrderCard';
import { Shop } from '../../common/types';
import { useEffect } from 'react';

interface Orders {
    date: Date
    cards: JSX.Element[]
}

interface shopProp {
    shop: Shop;
}

function PreviousOrders({ shop }: shopProp) {

    const dispatch = useDispatch()
    const result = useSelector(selectGetByShopStatus)
    const userString: string = useSelector(selectUser) || ""
    const nav = useNavigate();
    const invoices = useSelector(selectInvoices)
    var orders: Orders[] = [];

    useEffect(() => {
        return () => { dispatch(clearInvoices()); dispatch(resetState(null)); }
    }, [])

    if (!userString)
        nav("/login")

    switch (result) {
        case "idle":
            dispatch(getInvoicesByShop(shop))
            break;
        case "finished":
            for (let i = 0; i < invoices.length; ++i) {
                orders.push({ cards: [], date: new Date(Number(invoices[i].orderPlaced)) })
                for (let j = 0; j < invoices[i].orderDetails.length; ++j)
                    orders[i].cards.push(
                        <OrderCard key={"Card: " + invoices[i].orderDetails[j].id} detail={invoices[i].orderDetails[j]}></OrderCard>
                    )
            }
            break;
        case "failure":
            break;
        default:
            break;
    }

    return (
        <>
            {((result === "idle" || result === "loading") &&
                <>
                    <h1>Loading</h1>
                    <img src={logo} className="App-logo" style={{ width: '50%' }} alt="logo"></img>
                </>

            ) || ((result === "finished") &&
                <>
                    {orders.length > 0 ? orders.map((order) => {
                        return (
                            <>
                                <div className="">{order.date.toDateString()}</div>
                                <div className="ProductCardContainer">
                                    {order.cards}
                                </div>
                            </>
                        )
                    }) :
                        <h1>No Orders To Show</h1>
                    }
                </>)

                || <Error404Page />
            }
        </>
    )
}

export default PreviousOrders