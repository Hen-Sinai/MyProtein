import Spinner from '../../../components/Spinner'
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PreviewProteinProduct.css";
import Navigation from "../../../components/Navigation";
import {
  selectProteinById,
} from "../proteinApiSlice";

const ProdeinProduct = () => {
  const { id } = useParams();
  const proteinProduct = useSelector(
    (state) => (console.log(state), selectProteinById(state, id))
  );

  if (!proteinProduct) {
    return <Spinner />;
  }

  return (
    <>
      <Navigation />
      <Container className="pt-4" style={{ position: "relative" }}>
        <Row>
          <Col lg={4}>
            <Card style={{ width: "15rem", margin: "10px" }}>
              <Card.Img
                variant="top"
                className="product-preview-img"
                alt="protein"
                src={proteinProduct.proteinImage}
                style={{ height: "300px", width: "300px", objectFit: "cover" }}
              />
            </Card>
          </Col>
          <Col lg={6} className="pt-3">
            <h1>{proteinProduct.name}</h1>
            <p className="product__price">{proteinProduct.price}$</p>
            <p className="product__price">{proteinProduct.flavour}</p>
            <p style={{ width: "300px" }} className="py-3">
              <strong>Description:</strong> {proteinProduct.description}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProdeinProduct;
