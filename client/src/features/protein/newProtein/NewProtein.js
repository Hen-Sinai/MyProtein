import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../../../components/Navigation";
import { useAddNewProteinMutation } from "../proteinApiSlice";
import { toast } from "react-toastify";
import "./NewProtein.css";

const NewProtein = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [flavour, setFlavour] = useState("");
  const [image, setImage] = useState([]);
  const [addNewProtein, { isError, error, isLoading, isSuccess }] =
    useAddNewProteinMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !flavour || !image) {
      toast.error("All fields are required");
    }
    await addNewProtein({ name, description, price, flavour, image });
    toast.success("Protein created");
    navigate("/protein");
  };

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "privatehen",
        uploadPreset: "privatehen",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImage(result.info.url);
        }
      }
    );
    widget.open();
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col md={6} className="new-product__form--container">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <h1 className="mt-4">Create a Protein</h1>
              {isSuccess && (
                <Alert variant="success">Protein created with succcess</Alert>
              )}
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Protein name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Protein description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Product description"
                  style={{ height: "100px" }}
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price($)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price ($)"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                onChange={(e) => setFlavour(e.target.value)}
              >
                <Form.Label>setFlavour</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    -- Select One --
                  </option>
                  <option value="Mango">Mango</option>
                  <option value="Banana">Banana</option>
                  <option value="Orange">Orange</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button type="button" onClick={showWidget}>
                  Upload Image
                </Button>
                {image?.length ? (
                  <div className="images-preview-container">
                    <div className="image-preview">
                      <img alt="img" src={image} />
                    </div>
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group>
                <Button type="submit" disabled={isLoading || isSuccess}>
                  Create Protein
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="new-product__image--container"></Col>
        </Row>
      </Container>
    </>
  );
};

export default NewProtein;
