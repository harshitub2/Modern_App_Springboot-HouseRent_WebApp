import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../components/Navbar';

import Hero from '../../components/Hero/Hero';
import propertymanagement from '../../Assets/propertymanagement.png';
import paymenttracking from '../../Assets/paymenttracking.png';
import viewtentants from '../../Assets/viewtentants.png';
import"./Landing.css"

const Landing = () => {

  return (
    <>
      <Navbar />
      <Hero />
      <React.Fragment>
        <h2 className='text-center my-5'>Features</h2>
        <Container style={{ padding: 0, marginBottom: '2rem' }}>
          <Row>
            <Col md={6} lg={4} className="col-sm-12">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={propertymanagement} alt="" />
                <Card.Body>
                  <Card.Title>Property Management</Card.Title>
                  <Card.Text style={{ color: '#000' }}>
                    Effortlessly manage your properties, view details, and track rent payments
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="col-sm-12">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={viewtentants} />
                <Card.Body>
                  <Card.Title>Tenant Management</Card.Title>
                  <Card.Text style={{ color: '#000' }}>
                    Keep track of your tenants, their information, and any complaints they have
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="col-sm-12">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={paymenttracking} />
                <Card.Body>
                  <Card.Title>Rent Payment Tracking</Card.Title>
                  <Card.Text style={{ color: '#000' }}>
                    Monitor rent payments and quickly identify which tenants have paid and who haven't
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>

    </>
  )
};
export default Landing;