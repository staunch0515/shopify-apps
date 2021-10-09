import Header from './Header'
import { Container, Row, Col } from 'react-bootstrap';
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default (props) => (
  <Container fluid='true'>
    <Row>
      <Col xs={12}><Header /></Col>
    </Row>
    <Row>
      <Col xs={1}></Col>
      <Col xs={11}>{props.children}</Col>
    </Row>
  </Container>
)