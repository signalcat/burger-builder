import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ingredients: null,
    //         totalPrice: 0
    //     }
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let totalPrice = 0;
    //     for (let param of query.entries()) {
    //         // Temporary workaround to pass data, will improve 
    //         if (param[0] === 'totalPrice') {
    //             totalPrice = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: totalPrice});
    // }

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            // Temporary workaround to pass data, will improve 
            if (param[0] === 'totalPrice') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
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
                    cancel={this.cancelHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                    render={() => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>)}></Route>
            </div>
        );
    }
}

export default Checkout;