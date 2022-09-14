import { Row } from "react-bootstrap"
import ProteinCard from "./ProteinCard"

const ProteinsGrid = ({ cardsId }) => {
  return (
    <div className="recent-products-container container mt-4">
      <Row>
        {cardsId.map((cardId) => (
          <ProteinCard key={cardId} cardId={cardId} />
        ))}
      </Row>
    </div>
  )
}

export default ProteinsGrid
