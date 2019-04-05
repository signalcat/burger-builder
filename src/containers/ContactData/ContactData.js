import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../hoc/axios.order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

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
        console.log(this.props);
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
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
        console.log(this.props);
    }

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Your zipcode"/>
                <Button btnType="Success" clicked={this.submitOrderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form=<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;