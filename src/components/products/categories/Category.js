import React, { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useCategoryContext } from "../../../context/categorycontext";

function Category({ category }) {
  const [show, setShow] = useState(false);
  const { isDeleteCategoryLoading, deleteCategoryCall,
    isUpdateCategoryLoading, updateCategoryCall } = useCategoryContext();
  const { id, categoryName } = category;
  const [categoryToUpdate, setCategoryToUpdate] = useState({
    categoryName: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteCat = (e) => {
    e.preventDefault();
    deleteCategoryCall(id);
  }

  const updateCat = (e) => {
    e.preventDefault();
    updateCategoryCall(id, categoryToUpdate);
    handleClose()
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setCategoryToUpdate({ ...categoryToUpdate, [e.target.name]: value });
  };
  if (isDeleteCategoryLoading) {
    return <div>... Loading</div>;
  }
  if (isUpdateCategoryLoading) {
    return <div>... Loading</div>;
  }
  return (
    <>
      <a key={category.id} href="#home">
        {categoryName}
      </a>
      <Button className="btn-sm btn-success" style={{ marginRight: "10px" }} onClick={handleShow}>
        <FiEdit2 />
      </Button>
      <Button className="btn-sm btn-danger">
        <MdDelete onClick={deleteCat} />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container text-center">
            <Row className="mb-3">
              <Form.Group className="col col-sm-12">
                <Form.Control type="name" name="categoryName"
                  placeholder="Category Name" className="form-control-sm" defaultValue={categoryName}
                  onChange={(e) => handleChange(e)} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="col col-sm-12">
                <button type="submit" className="me-4 btn btn-success btn-sm btn-block" onClick={updateCat}>
                  Update
                </button>
                <button type="reset" className="me-4 btn btn-danger btn-sm btn-block" onClick={handleClose}>
                  Cancel
                </button>
              </Form.Group>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Category;
