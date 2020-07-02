import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilliary" ;
import classes from "./PendingProductDetail.css" ;
import { Container,Row,Col,Button } from "react-bootstrap" ;
import Axios from 'axios';

class PendingProduct extends Component {

    componentDidUpdate(){
        console.log("indidef");
        if(this.props.id){
            Axios.get('https://limitless-lowlands-36879.herokuapp.com/products/:' + this.props.id)
            .then(res => {
                console.log(res);
            })
            .catch(err=> {
                console.log(err);
            });
        };
    };

    render(){
        return(
            <Aux>
                <Container>
                <Row>
                    <Col lg={4}>
                        <img src={this.props.image} alt="" className={classes.Image} />
                    </Col>
                    <Col className={classes.VerLine}>
                    </Col>
                    <Col className={classes.Details} lg={6}>
                        <Row>
                            <Col>
                                <h2>{this.props.name}</h2>
                                <p>{this.props.description}</p>
                                <h5>Rs. {this.props.price}</h5>
                                <h6>{this.props.sellerId}</h6>
                                <p>Quantity : {this.props.quantity} pcs</p>
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
    )};
};

export default PendingProduct;