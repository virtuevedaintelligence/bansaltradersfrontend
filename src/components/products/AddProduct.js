import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useCategoryContext } from "../../context/categorycontext";
import { useProductContext } from "../../context/productcontext";
function AddProduct() {
  const { isLoadingCategory, categories } = useCategoryContext();

  const { product, setProduct } = useState({
    productName: "",
    productImageUrl: "",
    productDescription: "",
    productPrice: 0,
    quantity: 0,
    weight: 0,
    categoryName: "",
    featured: false,
  });
  const { isSaveProductLoading, saveProductCall } = useProductContext();

  const save = (e) => {
    e.preventDefault();
    saveProductCall(product);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setProduct({ ...product, [e.target.name]: value });
  };

  if (isLoadingCategory) {
    return <div>... Loading</div>;
  }
  if (isSaveProductLoading) {
    return <div>... Loading</div>;
  }
  return (
    <div>
      <form className="container mt-3 mb-3">
        <Row className="mb-3">
          <Form.Group className="col col-sm-6">
            <Form.Control type="name" name="productName" placeholder="Product Name" className="form-control" value={product.productName} onChange={(e) => handleChange(e)}>
              {product.productName}
            </Form.Control>
          </Form.Group>
          <Form.Group className="col col-sm-6">
            <Form.Select defaultValue="Choose..." className="form-control" name="categoryName" onChange={(e) => handleChange(e)}>
              {categories.map((category) => {
                return (
                  <option key={category.categoryId} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col col-sm-6">
            <Form.Control aria-label="Upload Product Image" type="file" className="form-control" name="image" value={product.productImageUrl} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className="col col-sm-6">
            <Form.Check label="featured" value={product.featured} onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className=" col col-sm-12">
            <Form.Control as="textarea" placeholder="Product Description" className="form-control" type="text-area" name="description" value={product.productDescription} onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col col-sm-4">
            <Form.Select defaultValue="Choose..." className="form-control" name="weight" onChange={(e) => handleChange(e)}>
              <option value="Choose...">Select Weight</option>
              <option value="250">250gm</option>
              <option value="500">500gm</option>
              <option value="1000">1000gm</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col col-sm-4">
            <Form.Control className="form-control" type="pin" name="price" placeholder="Enter Price" value={product.productPrice} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className="col col-sm-4">
            <Form.Control className="form-control" type="number" name="quantity" placeholder="Enter Quantity" value={product.quantity} onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col col-sm-6">
            <button type="submit" className="me-4 btn btn-success btn-lg btn-block" onClick={save}>
              Submit
            </button>
            <button type="reset" className="me-4 btn btn-danger btn-lg btn-block">
              Cancel
            </button>
          </Form.Group>
        </Row>
      </form>
    </div>
  );
}

export default AddProduct;