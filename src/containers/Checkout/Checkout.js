import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    continueHandler = () => {
        this.props.history.replace('./checkout/contact-data');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    continue={this.continueHandler}
                    cancel={this.cancelHandler}>
                </CheckoutSummary>
            </div>
        );
    }
}

export default Checkout;