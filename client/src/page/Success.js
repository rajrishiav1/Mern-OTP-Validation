import React from 'react'
import Card from 'react-bootstrap/Card';

const Success = () => {
  return (
   <>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Payement</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Status?...</Card.Subtitle>
        <Card.Text>
        Payement succesfully done
        </Card.Text>
        <Card.Link href="/">Go To Homepage</Card.Link>
        <Card.Link href="/cart">Go to cart</Card.Link>
      </Card.Body>
    </Card>
   
   </>
  )
}

export default Success
