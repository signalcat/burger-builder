import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../hoc/axios.order';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        
        // For firebase, the name is the node name + .json
        const order = {
            ingredients: this.props.ingredients,
            // In real app, calculate the price on the server side
            totalPrice: this.props.totalPrice,
            customer: {
                name: 'Rbc',
                address: {
                    stree: 'Teststreet 1',
                    zipcode: '11111',
                    country: 'Ger'
                },
                email: 'test@test.mail'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
            });
        console.log(this.props);
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"></input>
                    <input className={classes.Input} type="text" name="postal" placeholder="Your zipcode"></input>
                    <Button btnType="Success" clicked={this.submitOrderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;