import { Card } from "react-bootstrap"

export default function Footer() {
  return (
    <Card bg='secondary'
    style={{position: "fixed", bottom: '0', width: '100%'}}>
      <Card.Body>
        <Card.Text>This is a footer</Card.Text>
      </Card.Body>
    </Card>
  )
}
