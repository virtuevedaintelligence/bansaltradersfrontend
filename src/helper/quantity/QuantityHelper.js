import React, { useState } from "react";

function QuantityHelper({ singleProduct }) {
  const { quantity } = singleProduct;
  const [orderQuantity, setOrderQunatity] = useState(1);
  const decreaseQuantity = () => {
    orderQuantity > 1 ? setOrderQunatity(orderQuantity - 1) : setOrderQunatity(1);
  };

  const increaseQuantity = () => {
    orderQuantity < quantity ? setOrderQunatity(orderQuantity + 1) : setOrderQunatity(quantity);
  };
  return (
    <>
      <div className="col-md-4 py-3">
        <div className="d-flex align-middle">
          <button className="btn btn-sm btn-primary mb-0" onClick={decreaseQuantity}>
            -
          </button>
          <div size="m" readOnly disabled type="text" className="text-center qty_cost_bg" placeholder="1">
            {orderQuantity}
          </div>
          <button className="btn btn-sm btn-primary mb-0" onClick={increaseQuantity}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default QuantityHelper;