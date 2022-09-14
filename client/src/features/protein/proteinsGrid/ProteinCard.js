import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux'
import { selectProteinById } from '../proteinApiSlice'

const ProteinCard = ({ cardId }) => {
    const card = useSelector(state => selectProteinById(state, cardId))
    return (
        <LinkContainer to={`${card.id}`} style={{ cursor: "pointer", width: "15rem", margin: "20px" }}>
            <Card style={{ width: "20rem", margin: "10px" }}>
                <Card.Img variant="top" className="product-preview-img" alt="protein" src={card.proteinImage} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <Card.Text> {card.flavour} </Card.Text>
                    <Card.Text> {card.price}$ </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProteinCard;