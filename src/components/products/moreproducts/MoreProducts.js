import React from "react";
import { useProductContext } from "../../../context/productcontext";
import MoreProduct from "./MoreProduct";

function MoreProducts({ categoryName, id }) {
  const { isLoading, products } = useProductContext();

  if (isLoading) {
    return <div>... Loading</div>;
  }
  return (
    <>
      <div className="row mt-3 p-0 text-center pro-box-section">
        {products
          .filter((product) => product.productId !== id)
          .filter((product) => product.categoryName === categoryName)
          .map((product) => {
            return <MoreProduct key={product.productId} product={product} />;
          })}
      </div>
    </>
  );
}

export default MoreProducts;
