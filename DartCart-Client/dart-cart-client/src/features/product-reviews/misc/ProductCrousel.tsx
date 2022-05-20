import React, { useState } from 'react'
import { Col, Row, Container, Image, Card, Carousel } from "react-bootstrap";

function ProductCrousel(props) {
    const pics = ['cellphone', 'shirt', 'shoes', 'drone', 'scooter', 'pants', 'travel', 'calm', 'javascript']
    const [currentPic, setCurrentPic] = useState(Math.floor(Math.random() * (pics.length + 1)))

    return (<>
        <Carousel>
            {pics.map((e, i) => {
                return (
                    <Carousel.Item>
                        <Container fluid>
                            <Row>
                                {props.cols.map((e, i) => {
                                    const randNum = Math.floor(Math.random() * (pics.length - 2))
                                    return (<Col key={`imc2-${i}`} lg={e}>

                                        <Card key={`imca2-${i}`} style={{ height: '100%' }}>
                                            <Image
                                                // onClick={() => setCurrentPic(randNum + i)} 
                                                key={`im2-${i}`} src={`https://source.unsplash.com/1600x900/?${pics[randNum + i]}`} />
                                            {/* <Card.Body>
            <Card.Title></Card.Title>
          </Card.Body> */}
                                        </Card>
                                    </Col>)
                                })}

                            </Row>
                        </Container>
                        {/* <Carousel.Caption>
                            <h3>{e}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>)
            })}
        </Carousel>
    </>)
}

export default ProductCrousel