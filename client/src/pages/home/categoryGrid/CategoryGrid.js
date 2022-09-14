import { Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import "./Category.css";

const CategoryGrid = ({ options }) => {
  return (
    <div className="recent-products-container container mt-4">
      <Row>
        {options.map((option, ind) => (
          <CategoryCard key={ind} option={option} />
        ))}
      </Row>
    </div>
  );
};

export default CategoryGrid;
