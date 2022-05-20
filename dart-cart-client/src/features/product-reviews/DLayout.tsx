import React from 'react'
import { Col, Row, Container, Image, Card } from "react-bootstrap";

function DLayout(props) {
    return (
        <Row>{props.cols.map((e, i) => {
            if (e == 'z') {
                e = 12
            }
            else if (e === "0") {
                e = 10
            }
            return (<Col style={{ transition: '350ms', paddingBottom: '25px' }} key={`${props.dname}-${i}`} lg={e}>{props.features[i]}</Col>)
        })}</Row>
    )
}

export default DLayout