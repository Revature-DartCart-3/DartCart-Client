import { Alert, Modal, Button, Form } from "react-bootstrap";
import {
  saveSellerandShop,
  shopRedirect,
} from "../../common/slices/sellerRegisterSlice";
import { Seller, Shop } from "../../common/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import {
  fetchShop,
  selectSeller,
  selectShop,
  selectUser,
} from "../../common/slices/authSlice";
import { useSelector } from "react-redux";
import {
  createShopProduct,
  getAllProducts,
  selectProducts,
} from "../../common/slices/listItemSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import { ShopProduct } from "../../common/models";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

export function ListItem() {
  const [productName, setProductName] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState<string>("");
  const [productDiscount, setProductDiscount] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const stateProducts = useSelector(selectProducts);
  const stateShop = useSelector(selectShop);
  const shop = JSON.parse(stateShop);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const stateSeller = useSelector(selectSeller);
  const seller = JSON.parse(stateSeller || "");

  useEffect(() => {
    dispatch(fetchShop(seller[0].id));
    dispatch(getAllProducts());
  }, []);

  const extractProductNames = () => {
    return stateProducts.map((product) => {
      return product.name;
    });
  };
  const products = extractProductNames();

  const setChosenProduct = () => {
    if (productName) {
      return stateProducts.find((product) => product?.name === productName[0]);
    }
  };
  const chosenProduct = setChosenProduct();

  const extractCategories = () => {
    return chosenProduct.categories.map((category) => {
      return category.name;
    });
  };

  const checkChosenProduct = () => {
    if (chosenProduct) {
      return extractCategories();
    }
  };
  const categories = checkChosenProduct();

  const shopProduct: ShopProduct = {
    shop_product_id: 0,
    shop: shop,
    product: chosenProduct,
    quantity: 0,
    price: 0,
    location: '',
    discount: 0,
  };

  const validateInput = () => {
    if (chosenProduct === undefined) {
      setError("Select a product.");
    } else if (productQuantity === 0) {
      setError("Enter a valid quantity.");
    } else if (productPrice === "") {
      setError("Enter a product price.");
    } else {
      return true;
    }
  };

  const handleOnClick = () => {
    shopProduct.quantity = productQuantity;
    const rawPrice = productPrice.slice(1);
    // Multiply by 100 to convert dollar price to raw cents value
    shopProduct.price = Number.parseFloat(rawPrice) * 100;
    if (productDiscount)
      shopProduct.discount = Number.parseFloat(productDiscount) * 100;

    if (!validateInput()) {
      return;
    }

    dispatch(createShopProduct(shopProduct))
      .unwrap()
      .then((originalPromiseResult) => setShowModal(true))
      .catch((rejectValueOrSerializedError) => {
        setError("Something went wrong...");
      });
  };

  const handleClose = () => {
    setShowModal(false);
    dispatch(shopRedirect(null));
    nav("/");
  };

  return (
    <>
      <section className="vh-200">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-header card text-center bg-success text-white">
                  <h3 className="mb-0">List an Item</h3>
                </div>
                <div className="card-body p-3 text-center">
                  <div id="description">
                    <p>
                      Post a new item for sale. Search our existing database of
                      products, then provide a quantity and price.
                    </p>
                  </div>

                  {error ? <Alert variant="danger">{error}</Alert> : null}

                  <div className="row">
                    <div className="form-outline mb-0">
                      <h4>Product Name</h4>
                    </div>
                    <div className="form-outline mb-4">
                      <Form.Group>
                        <Form.Label>Select Product</Form.Label>
                        <Typeahead
                          className="form-control form-control-lg"
                          id="basic-typeahead-single"
                          labelKey="name"
                          onChange={(selected) => {
                            setProductName(selected);
                          }}
                          options={products}
                          placeholder="Search by product name"
                          selected={productName}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline mb-0">
                      <h4>Category: {categories?.join(", ")}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline mb-0">
                      <h4>Quantity</h4>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        placeholder={`0`}
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        value={productQuantity}
                        onChange={(e) => {
                          setProductQuantity(Number.parseInt(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline mb-0">
                      <h4>Price Per Item</h4>
                    </div>
                    <div className="form-outline mb-4">
                      <span>$</span>
                      <CurrencyInput
                        prefix="$"
                        id="typeEmailX-2"
                        name="product-price"
                        className="form-control form-control-lg"
                        placeholder="Please enter a price."
                        defaultValue={0}
                        decimalsLimit={2}
                        onChange={(e) => setProductPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline mb-0">
                      <h4>Discount</h4>
                    </div>
                    <div className="form-outline mb-4">
                      <CurrencyInput
                        prefix="$"
                        id="typeEmailX-2"
                        name="discount-price"
                        className="form-control form-control-lg"
                        placeholder="Please enter a discount."
                        defaultValue={0}
                        decimalsLimit={2}
                        onChange={(e) => setProductDiscount(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={handleOnClick}
                  >
                    Post
                  </button>

                  <Modal show={showModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>List Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Item listed for sale!</Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListItem;
