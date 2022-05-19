import React from 'react'
import { Carousel } from "react-bootstrap";

function ReviewCrousel() {
    const pics = ['cellphone', 'shirt', 'shoes', 'drone', 'scooter', 'pants', 'travel', 'calm', 'javascript']
    return (<>
        <Carousel>
            {pics.map((e, i) => {
                return (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={`https://source.unsplash.com/1600x400/?${e}`}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>{e}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>)
            })}
        </Carousel>
    </>)
}

export default ReviewCrousel