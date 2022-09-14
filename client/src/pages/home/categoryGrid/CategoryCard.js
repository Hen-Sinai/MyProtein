import { Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Category.css";

const CategoryCard = ({ option }) => {
  return (
    <LinkContainer to={`/${option.name.toLocaleLowerCase()}`}>
      <Col md={4}>
        <div
          className="category-tile"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${option.img})`,
            gap: "10px",
          }}
        >
          {option.name}
        </div>
      </Col>
    </LinkContainer>
  );
};

export default CategoryCard;
