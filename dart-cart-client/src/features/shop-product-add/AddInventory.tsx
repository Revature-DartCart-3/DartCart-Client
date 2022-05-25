import { Alert, Modal, Button, Form } from "react-bootstrap";
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

  //basic form validation
  const validateInput = () => {
    if (quantity < 1) {
      setError("Please enter a quantity.");
    } else if (shop_id <= 0) {
      setError("Please choose a shop.");
    } else if (product_id <= 0) {
      setError("Please choose a product.");
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
        setShowModal(true);
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

  // closes modal but allows user to add more inventory
  function handleAddMore() {
    setShowModal(false);
  }

  // Redirects to home upon modal close
  function handleClose() {
    setShowModal(false);
    nav('/');
  }

  return (
    <>
      <Form>
        <div className="shop-form-heading">
          <h2>Add Product Inventory</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Shop */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Shop
          </Form.Label>
          <Form.Select
            aria-label="Select a shop"
            size="lg"
            id="shop_selector"
            className="form-select"
            value={shop_id}
            onChange={(e) => {
              setShop(parseInt(e.target.value));
            }}>
            <option value="0">Select a Shop</option>
            {ReduxMyShops.map((shop) => {
              return <option key={shop.id} value={shop.id}>{shop.seller.name}({shop.location})</option>;
            })}
          </Form.Select>
        </Form.Group>

        {/* Product */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Product
          </Form.Label>
          <Form.Select
            aria-label="Select a product"
            size="lg"
            id="product_selector"
            className="form-select"
            value={product_id}
            onChange={(e) => {
              setProduct(parseInt(e.target.value));
            }}>
            <option value="0">Select a Product</option>
            {ReduxShopProducts.map((product) => {
              return <option key={product.id} value={product.id}>{product.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        {/* Quantity */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Quantity
          </Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            size="lg"
            value={quantity}
            min="0"
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }} />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Price
          </Form.Label>
          <Form.Control
            type="number"
            id="price"
            size="lg"
            value={price}
            min="0"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }} />
        </Form.Group>

        {/* Discount */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Discount
          </Form.Label>
          <Form.Control
            type="number"
            id="discount"
            size="lg"
            value={discount}
            min="0"
            onChange={(e) => {
              setDiscount(parseInt(e.target.value));
            }} />
        </Form.Group>

        {/* Submit button */}
        <button
          type="button"
          className="submit-button"
          onClick={createInventoryProduct}
        >
          Submit
        </button>
      </Form>

      {/* Success Modal */}
      <Modal 
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Inventory successfully added. Congratulations!
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-button" onClick={handleAddMore}>Add More</button>
          <button className="modal-button" onClick={handleClose}>Back to Home</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddInventory;
