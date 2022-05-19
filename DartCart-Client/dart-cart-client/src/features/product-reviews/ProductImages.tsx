import React, { useState } from 'react'
import { Col, Row, Container, Image, Card } from "react-bootstrap";

function ProductImages({ pics = [
    'cellphone', 'shirt', 'shoes', 'drone', 'scooter', 'pants', 'travel', 'calm', 'javascript',
    // 'https://i5.walmartimages.com/asr/6c4d2602-b227-4bec-a996-4caa6cc8ef35.2128b485b9800aab616205ee1a8a555e.jpeg',
    // 'https://i5.walmartimages.com/asr/555be7a6-86b5-40ce-b9be-81e309364c06_1.90bd7f3210b851fcbaa8d89e1dc232c3.jpeg',
    // 'https://i5.walmartimages.com/asr/d392dc22-b0a8-4d50-a16b-d15d3509aeea_1.09c9470b926d9241d5302c5c542bc904.jpeg',
    // 'https://i5.walmartimages.com/asr/74d1d424-e223-48bd-aa16-fff49c2dd89a_1.65bcb0c9e4255224458374bb62d446a9.jpeg',
    // 'https://i5.walmartimages.com/asr/2b546dc9-127f-4c48-9651-73b20d087b77_1.190fa8bb760a5f4f5165be53c1652462.jpeg','https://i5.walmartimages.com/asr/f41a422d-9b73-4fe9-92bc-46d64296df5e_1.7c37f13916e8174eb3bc6327e4b1008f.jpeg','https://i5.walmartimages.com/asr/488ab4a6-89c7-46d3-bae6-da863d2fe25a_1.58cd4da70e2de7fd8b9eed0ef3d71ae2.jpeg',
    // 'https://i5.walmartimages.com/asr/54d32613-053d-41d5-8d2d-ed09cd5fae8a_1.e85720199805f44731ab2a040d391f4a.jpeg','https://i5.walmartimages.com/asr/4e64a64b-495e-4408-8126-499ce1f690f6_1.85f1705fdd4a86be8d590eea074a6101.jpeg','https://i5.walmartimages.com/asr/8491f94b-0282-4cb8-b36a-2b745af40051_1.3f636e55b8e7adfbeb9767e65ad81d3d.jpeg'
] }) {
    // const pics = ['cellphone', 'shirt', 'shoes', 'drone', 'scooter', 'pants', 'travel', 'calm', 'javascript']
    const [currentPic, setCurrentPic] = useState(Math.floor(Math.random() * (pics.length + 1)))
    const randNum = Math.floor(Math.random() * (pics.length - 2))
    return (
        <Container>
            
        </Container>
    )
}

export default ProductImages