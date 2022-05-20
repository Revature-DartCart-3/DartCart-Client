import { Alert, Modal, Button } from "react-bootstrap";
import { addInventory, selectShopProducts, getStatus, fetchShopProducts } from "../../common/slices/shopProductSlice";
import { selectShops, fetchShops } from "../../common/slices/shopSlice";
import { InventoryProduct, Shop } from "../../common/types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { Product } from "../../common/models";

export function AddInventory() {
  const[quantity, setQuantity] = useState(0);
  const[discount, setDiscount] = useState(0);
  const[price, setPrice] = useState(0);
  const[shop_id, setShop] = useState(0);
  const[product_id, setProduct] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const ReduxShopProducts: Product[] = useSelector(selectShopProducts);
  const ReduxMyShops: Shop[] = useSelector(selectShops);
  const status = useSelector(getStatus);

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  useEffect(() => {
      dispatch(fetchShops(""));
      dispatch(fetchShopProducts(""));
  }, []);

  const inventoryProduct: InventoryProduct = {
    id: 0,
    shop_id: 0,
    product_id: 0,
    quantity: 0,
    discount: 0,
    price:0
  };

  // BASIC input validation: no empty fields, passwords must match, formatting requirements
  // Possible TODO: Password complexity requirements
  // Possible TODO: Enforcing username requirements, address formatting
  const validateInput = () => {
    if (quantity < 1) {
      setError("Please enter a quantity.");
    } else if (shop_id < 0) {
      setError("Please enter a valid shop id.");
    } else if (product_id < 0) {
      setError("Please enter a valid product id.");
    } else if (discount < 0) {
      setError("Please enter a discount.");
    } else if (price < .01) {

      setError("Please enter a price.");
    }
    else {
      return true;
    }
  };

  const createInventoryProduct = async () => {
    inventoryProduct.shop_id = shop_id;
    inventoryProduct.product_id = product_id;
    inventoryProduct.quantity = quantity;
    inventoryProduct.discount = discount;
    inventoryProduct.price = price;



    if (!validateInput()) {
      return;
    }

    await dispatch(addInventory(inventoryProduct))
      .unwrap()
      .then((originalPromiseResult) => {
        setShowModal(true); //need to make sure this says product created, not user registered
        clearInputs();
      })
      .catch((rejectedValueOrSerializedError) => {
        setError("Server error.");
        clearInputs();
      });
  };

  function clearInputs() {
    setShop(0);
    setProduct(0);
    setDiscount(0);
    setQuantity(0);
    setPrice(0);
  }

  // Redirect upon modal close
  function handleClose() {
    setShowModal(false);
  }

  return (
    <>
      <section className="vh-200">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-10 col-sm-12">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-header card text-center bg-success text-white">
                  <h3 className="mb-0">Add Inventory</h3>
                </div>
                <div
                  className="card-body p-5 text-center"
                >
                  {error ? <Alert variant="danger">{error}</Alert> : null}

                  <div className="row">
                  <div className="form-outline mb-0">
                        <h4>Shop</h4>
                    </div>
                  <div className="form-outline mb-4">
                      <select className="form-control form-control-lg"
                      id="shop_selector"
                      value={shop_id}
                      onChange={(e) => {
                        setShop( parseInt(e.target.value) );
                      }}>
                        <option value="0">Select a Shop</option>
                        {ReduxMyShops.map((Shop) => {
                          return <option value={Shop.id}>{Shop.location}</option>;
                        })}
                      </select>
                      </div>
                  </div>

                  <div className="row">
                  <div className="form-outline mb-0">
                        <h4>Product</h4>
                    </div>
                  <div className="form-outline mb-4">
                      <select className="form-control form-control-lg"
                      id="product_selector"
                      value={product_id}
                      onChange={(e) => {
                        setProduct( parseInt(e.target.value) );
                      }}>
                        <option value="0">Select a Product</option>
                        {ReduxShopProducts.map((Product) => {
                          return <option value={Product.id}>{Product.name}</option>;
                        })}
                      </select>
                      </div>
                  </div>

                  <div className="row">
                    <div className="form-outline mb-0">
                        <h4>Quantity</h4>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        placeholder="Quantity"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={quantity}
                        min="0"
                        onChange={(e) => {
                          setQuantity( parseInt(e.target.value) );
                        }}
                      />
                    </div>
                </div>
                <div className="row">
                <div className="form-outline mb-0">
                        <h4>Price</h4>
                    </div>
                <div className="form-outline mb-4">
                      <input
                        type="number"
                        placeholder="Price"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={price}
                        min="0"
                        onChange={(e) => {
                          setPrice( parseInt(e.target.value) );
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                  <div className="form-outline mb-0">
                        <h4>Discount</h4>
                    </div>
                <div className="form-outline mb-4">
                      <input
                        type="number"
                        placeholder="Discount"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={discount}
                        min="0"
                        onChange={(e) => {
                          setDiscount( parseInt(e.target.value) );
                        }}
                      />
                    </div>
                  </div>
                  </div>

                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={createInventoryProduct}
                  >
                    Add
                  </button>

                  <Modal show={showModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Inventory created. Congratulations!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

export default AddInventory;
