import { useParams } from "react-router-dom";
const obj = [
    {
        id: 1,
        image: 'https://picsum.photos/200/200?random=1',
        productName: 'test1'
    },
    {
        id: 2,
        image: 'https://picsum.photos/200/200?random=2',
        productName: 'test2'
    },
    {
        id: 3,
        image: 'https://picsum.photos/100/100?random=3',
        productName: 'test3'
    }
];
export default function Product() {
    const { product_id } = useParams();
    const id: number = parseInt(product_id!);
    const ImgStyleBase = {
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "40%",
    };
    let pro = {
        id: 1,
        image: 'https://picsum.photos/10/10?random=1',
        productName: 'test1'
    };

    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {
            pro.id = obj[i].id;
            pro.image = obj[i].image;
            pro.productName = obj[i].productName;
            break;
        }
    }
    return (<div className="ProductContainer">
        <div className="InnerProduct">
            <div className="ProductInfoContainer" >
                <img className="card-img-top" style={{ width: "18rem" }}
                    src={pro.image}
                    alt="Card image cap"
                ></img> 
                <div className="ProductInfoPocket">
                    <h1> id = {pro.id}</h1>
                    <h1>{pro.productName}</h1>
                </div>
            </div>
        </div>
    </div>
    )

}