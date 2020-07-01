import React from 'react';
import Aux from "../../../hoc/Auxilliary" ;
import classes from "./PendingProductDetail.css" ;
import { Container,Row,Col,Button } from "react-bootstrap" ;

const PendingProduct = (props) => {
    const ul = "https://homepuff.com/wp-content/uploads/2018/06/11-31.jpg" ;
    const ll = "https://img.newspapers.com/img/thumbnail/409329737/400/400/0_0_6041_8538.jpg?cs=604800" ;

    return(
        <Aux>
            <Container>
                <Row>
                    <Col lg={4}>
                        <img src={ul} alt="" className={classes.Image} />
                    </Col>
                    <Col className={classes.VerLine}>
                    </Col>
                    <Col className={classes.Details} lg={6}>
                        <Row>
                            <Col>
                                <h2>Clark's</h2>
                                <p>Good quality bottle for daily use</p>
                                <h5>Rs. 320</h5>
                                <h6>Seller : AND Corps.</h6>
                                <p>Quantity : 2 pcs</p>
                            </Col>
                            <Col>
                            <Button vaiant="success" className={classes.Btn}>Accept Request</Button>
                            <Button variant="danger" className={classes.Btn}>Deny Request</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Aux>
    )
} 

export default PendingProduct;