import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Image, Card } from "react-bootstrap";

function MiscTableOne() {



  return (
    <><Card style={{ height: '100%' }}>
      {/* <Image src={`https://source.unsplash.com/1600x900/?${pics[e]}`} /> */}
      <Card.Body>
        <Card.Title>$189.99</Card.Title>
        <table style={{ width: '100%' }} >
          <thead>
            <tr>
              {['id', 'title', 'comment'].map(c => {
                return (
                  <th>{c}</th>
                )
              })}

            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map(e => {
              return (
                <tr>
                  {['id', 'title', 'comment'].map(c => {
                    return (
                      <td>{e}{c}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card.Body>
    </Card></>
  )
}

export default MiscTableOne