import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

    componentDidMount () {
        console.log(this.props);
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
                    ingredients={this.props.ings}
                    continue={this.continueHandler}
                    cancel={this.cancelHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
};

export default connect(mapStateToProps)(Checkout);