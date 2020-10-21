import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  ListGroupItem,  
} from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, product, error } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  },[dispatch, match])

  return (
    <>
      <Link class="btn btn-light my-3" to="/">
        Go Back
      </Link>
      { loading ? <Loader />: error ? <Message>{error}</Message> :  (<Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroupItem>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Status:</Col>
              <Col>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Button
              variant="dark"
              block
              disabled={product.countInStock === 0}
            >
              ADD TO CART
            </Button>
          </ListGroupItem>
        </Card>
      </Col>
    </Row>
    )}
      
    </>
  )
}

export default ProductScreen
