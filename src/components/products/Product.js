import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol } from "mdb-react-ui-kit";
import "./products.css";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { MdDelete } from "react-icons/md";
import FormatPrice from "../../helper/formatprice/FormatPrice";
import { useProductContext } from "../../context/productcontext";
import Quantity from "../../helper/quantity/QuantityHelper";
import AddToWishlist from "./../AddToWishlist";
import { useDispatch, useSelector } from "react-redux";
import UpdateProduct from "./UpdateProduct";
import Preloader from "../preloader/Preloader";
import { add } from "../../store/slices/CartSlice";
function Product({ product }) {
  const dispatch = useDispatch();
  const { isDeleteProductLoading, deleteProductCall, singleProduct } = useProductContext();
  var [actualPrice, setActualPrice] = useState();
  function calculateActualPrice(productPrice) {
    actualPrice = productPrice + 200;
    setActualPrice(actualPrice);
  }
  const { productId, productName, productImageUrl, productDescription, productPrice, quantity, weight, categoryName, featured, ratingResponse } = product;

  useEffect(() => {
    calculateActualPrice(productPrice);
  }, []);
  const deleteProd = (e) => {
    e.preventDefault();
    deleteProductCall(productId);
  };
  if (isDeleteProductLoading) {
    return <Preloader />;
  }

  const handleAdd = (product) => {
    console.log(product);
    dispatch(add(product));
  };

  return (
    <>
      <MDBCol sm="6" md="4" lg="4" className="mb-4 products" key={productId}>
        <MDBCard>
          <div className="d-flex justify-content-between p-3">
            <p className="lead mb-0">{productName}</p>
            <div className="justify-content-between">
              <UpdateProduct product={product} />
              <button className="btn-sm btn btn-danger">
                <MdDelete onClick={deleteProd} />
              </button>
            </div>
            <AddToWishlist />
          </div>
          <NavLink to={`/dryfruitdetails/${productId}`}>
            <MDBCardImage src={productImageUrl} position="top" alt={productName} />
          </NavLink>
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small mb-2">
                <a href="#!" className="text-muted">
                  {categoryName}
                </a>
              </p>
              <div className="productDiscCost">
                {<FormatPrice productPrice={productPrice} />} | <s value={actualPrice}>{<FormatPrice productPrice={actualPrice} />}</s>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <h6 className="mb-0 productDesc">{productDescription}</h6>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0 productQty  m-0">
                In Stock: <span className="fw-bold">{quantity} packets</span>
              </p>
              <p className="text-muted mb-0">
                Weight: <span className="fw-bold">{weight} gms</span>
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Select aria-label="Default select example" size="sm">
                  <option>Select Weight</option>
                  <option value="1">250 GM</option>
                  <option value="2">500 GM</option>
                  <option value="3">1000 Gm</option>
                </Form.Select>
              </div>
              <Quantity singleProduct={singleProduct} />
              <div className="col-md-6 mt-3">
                <NavLink className="btn btn-warning btn-sm mb-0" to={`/dryfruitdetails/${productId}`}>
                  View Product
                </NavLink>
              </div>
              <div className="col-md-6 mt-3">
                <button
                  className="btn btn-primary btn-sm mb-0 add_to_cart"
                  onClick={() => {
                    handleAdd(product);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
}

export default Product;
