import { useParams } from "react-router-dom";
import "./shopProduct.css";
import { useSelector } from "react-redux";
import { Col, Row, Container, Image, Card } from "react-bootstrap";
import { AiFillStar } from 'react-icons/ai';
import { selectShopProductById } from "../../common/slices/shopProductSlice";
import { CompetingSellers } from "../competing-sellers/CompetingSellers";

//imgs
import cartoonBat from "../../imgs/cartoon-baseball-bat.png";
import cartoonComputer from "../../imgs/cartoon-computer.png";
import cartoonSteak from "../../imgs/cartoon-steak.png";
import cartoonClothing from "../../imgs/Clothing-baby-clothes.png";
import cartoonDiamond from "../../imgs/diamond-ring.png";
import cartoonMeds from "../../imgs/Free-medica.png";
import cartoonShoes from "../../imgs/Sneaker-tennis-shoes.png";
import { useEffect } from "react";
import ProductReviewDetail from "./ProductReviewDetail";
import ProductReviewCard from "./product-review-card/ProductReviewCard"
const ShopProductDisplay = () => {
  const { shop_product_id } = useParams();

  const id: number = parseInt(shop_product_id!);

  const ReduxShopProducts = useSelector((state) =>
    selectShopProductById(state, id)
  );

  const pics = ['cellphone', 'shirt', 'shoes', 'drone', 'scooter', 'pants', 'travel', 'calm', 'javascript']

  useEffect((): void => {
    console.log(ReduxShopProducts);
  }, [ReduxShopProducts]);

  const ImgStyleBase = {
    backgroundImage: "",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "40%",
  };

  function ImgSplice(catagories: String[]) {
    let newImg = Object.assign({}, ImgStyleBase);
    catagories.forEach((catagory) => {
      switch (catagory) {
        case "perishable":
          newImg.backgroundImage = `url('${cartoonSteak}')`;
          break;
        case "furniture":
          newImg.backgroundImage = `url('${cartoonComputer}')`;
          break;
        case "entertainment":
          newImg.backgroundImage = `url('${cartoonComputer}')`;
          break;
        case "clothing":
          newImg.backgroundImage = `url('${cartoonClothing}')`;
          break;
        case "toys":
          newImg.backgroundImage = `url('${cartoonDiamond}')`;
          break;
        case "homegoods":
          newImg.backgroundImage = `url('${cartoonBat}')`;
          break;
        case "automotive":
          newImg.backgroundImage = `url('${cartoonBat}')`;
          break;
        case "personal-care":
          newImg.backgroundImage = `url('${cartoonMeds}')`;
          break;
        case "school&office":
          newImg.backgroundImage = `url('${cartoonShoes}')`;
          break;
      }
    });
    return newImg;
  }

  return (
    <Container fluid>
      <section style={{ backgroundColor: 'whitesmoke', padding: '10px', marginBottom: '50px', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
        <h1>Featured Review</h1>
      </section>
      <Row>
        <Col lg={4}>
          <Container>
            <Row>
              {[12].map((e, i) => {
                return (<Col lg={e}>

                  <Card style={{ height: '100%' }}>
                    <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                    {/* <Card.Body>
            <Card.Title></Card.Title>

          </Card.Body> */}
                  </Card>
                </Col>)
              })}

            </Row>
            <Row>
              {[3, 3, 3, 3].map((e, i) => {
                return (<Col lg={e}>

                  <Card style={{ height: '100%' }}>
                    <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                    {/* <Card.Body>
            <Card.Title></Card.Title>

          </Card.Body> */}
                  </Card>
                </Col>)
              })}

            </Row>
          </Container>
        </Col>
        <Col lg={5}>

        {/* <ProductReviewCard /> */}
        </Col>
        <Col lg={3}>

          <Container>
            <Row>
              {[12].map((e, i) => {
                return (<Col lg={e}>

                  <Card style={{ height: '100%' }}>
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
                  </Card>
                </Col>)
              })}

              {/* <ProductReviewDetail /> */}
            </Row>
          </Container>
        </Col>
      </Row>
      <section style={{ backgroundColor: 'whitesmoke', padding: '10px', marginTop: '50px', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
        <h1>Product Reviews</h1>
      </section>
      <Row>
        <Col lg={8}>

          <Container fluid className="" >
            <Row className="" >
              <Col lg={4} className="" >
                <h2>{ReduxShopProducts?.name?.toUpperCase()} Ratings:</h2>
                <Row>
                  {[12].map((e, i) => {
                    return (<Col lg={e}>

                      <Card style={{ height: '100%' }}>
                        {/* <Image src={`https://source.unsplash.com/1600x900/?${pics[e]}`} /> */}
                        <Card.Body>
                          <Card.Title></Card.Title>
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
                      </Card>
                    </Col>)
                  })}

                </Row>
                {/* </div> */}
              </Col>
              <Col lg={8} className="">
                {ReduxShopProducts && <div style={ImgStyleBase}></div>}
                <div className="">
                  <h2>{ReduxShopProducts?.name?.toUpperCase()} Reviews:</h2>
                  <Container>
                    <Row>
                      {[3,3,3].map((e, i) => {
                        return (<Col lg={e}>

                          <Card style={{ height: '100%' }}>
                            <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                            {/* <Card.Body>
                      <Card.Title></Card.Title>

                    </Card.Body> */}
                          </Card>
                        </Col>)
                      })}

                    </Row>
                  </Container>
                  {/* <table style={{ width: '100%' }}>
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
                      {[1, 2, 3, 3, 3, 3, 3, 3, 3].map(e => {
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
                  </table> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <p>{ReduxShopProducts?.description}Deals:</p>
                <table style={{ width: '100%' }} >
                  <thead>
                    <tr>
                      {['1', '2', '3', '4', '5'].map(c => {
                        return (
                          <th>{c}</th>
                        )
                      })}

                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map(e => {
                      return (
                        <tr>
                          <td>
                            <button>x</button>
                          </td>
                          {[1, 2, 3, 4].map(c => {
                            return (
                              <td>{Array.from(Array(c).keys()).map(c => {
                                return (
                                  <AiFillStar style={{ color: 'orange' }} />
                                )
                              })}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={8}>
                {/* <ProductReviewDetail /> */}
                <br />
                <Container>
                  <Row>
                    {[12].map(e => {
                      return (
                        <Col lg={e}>
                          <ProductReviewCard />
                          <br />
                        </Col>
                      )
                    })}
                  </Row>
                </Container>
              </Col>
            </Row>
            {/* <CompetingSellers Seller={ReduxShopProducts?.id!}></CompetingSellers> */}
          </Container>

          <Container fluid>
            <Row>
              {[4, 4, 4, 8, 4].map(e => {
                return (<Col lg={e}>
                  <ProductReviewCard />
                </Col>)
              })}

            </Row>
          </Container>
        </Col>
        <Col lg={4}>
          <Container fluid className="" style={{ height: '100%' }}>
            <Row className="" style={{ height: '100%' }}>
              <Col lg={12} className="" style={{ height: '100%' }}>
                <h2>{ReduxShopProducts?.name?.toUpperCase()} Featured:</h2>
                <Container>
                  <Row>
                    {[6, 6, 6, 6, 6].map((e, i) => {
                      return (<Col lg={e}>

                        <Card style={{ height: '100%' }}>
                          <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                          {/* <Card.Body>
                      <Card.Title></Card.Title>

                    </Card.Body> */}
                        </Card>
                      </Col>)
                    })}

                  </Row>
                  <br />
                  <Row>
                    {[12, 12, 12].map(e => {
                      return (
                        <Col lg={e}>
                          <ProductReviewCard />
                          <br />
                        </Col>
                      )
                    })}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <section style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
        <Row>
          <Col>

            <h2>{ReduxShopProducts?.name?.toUpperCase()} Stories:</h2>
            <Container fluid>
              <Row>
                {[3, 3, 3, 3,].map((e, i) => {
                  return (<Col lg={e}>

                    <Card style={{ height: '100%' }}>
                      <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                      {/* <Card.Body>
                      <Card.Title></Card.Title>

                    </Card.Body> */}
                    </Card>
                  </Col>)
                })}

              </Row>
              <br />
              <Row>
                {[3, 3, 3, 3].map(e => {
                  return (
                    <Col lg={e}>
                      <ProductReviewCard />
                      <br />
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </Col>
        </Row>

        <Row>
          <Col>
            <Container fluid>
              <Row>
                {[6, 3, 3].map((e, i) => {
                  return (<Col lg={e}>

                    <Card style={{ height: '100%' }}>
                      <Image src={`https://source.unsplash.com/1600x900/?${pics[i]}`} />
                      {/* <Card.Body>
                      <Card.Title></Card.Title>

                    </Card.Body> */}
                    </Card>
                  </Col>)
                })}

              </Row>
              <br />
              <Row>
                {[6, 3, 3].map(e => {
                  return (
                    <Col lg={e}>
                      <ProductReviewCard />
                      <br />
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </section >
    </Container >
  );
};

export default ShopProductDisplay;
